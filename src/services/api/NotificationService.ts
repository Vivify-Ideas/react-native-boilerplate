import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging'
import { User } from 'types/backend'
import { notificationHandleService } from './../NotificationHandleService'
import config from './../../config'

interface NotificationData {
  title?: string
  message: string
  icon?: unknown
  onPress: () => void
}

class NotificationService {
  showNotification = (data: NotificationData) => {
    console.log(data)
  }

  whenAppOpenedCallback = () => {}

  init(showNotification: (data: NotificationData) => void) {
    this.showNotification = showNotification

    // When app is in background
    messaging().onNotificationOpenedApp(({ data }) => {
      notificationHandleService.handleOnClick(data)
    })

    // When app is closed
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          this.whenAppOpenedCallback = () =>
            notificationHandleService.handleOnClick(remoteMessage.data)
        }
      })

    // When in foreground
    messaging().onMessage(message => {
      try {
        const { notification, data } = message
        if (!notification) {
          return
        }
        const { body, title } = notification
        // const imageUrl = data?.image_url

        showNotification({
          title: unescape(title || ''),
          message: unescape(body || ''),
          // Icon disabled
          // icon: imageUrl
          //   ? { uri: imageUrl }
          //   : require('./../../../assets/images/notificationsIcon.png'),
          onPress: () => notificationHandleService.handleOnClick(data)
        })
      } catch (e) {
        console.log(e) /*eslint-disable-line*/
      }
    })
  }

  getToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages()
      const token = await messaging().getToken()

      if (token) return token
    } catch (error) {
      console.log('Firebase get token error', error) /*eslint-disable-line*/
      return null
    }
  }

  getFCMToken = async (user?: User) => {
    try {
      await messaging().requestPermission()
      const authorized = await messaging().hasPermission()

      const fcmToken = await this.getToken()
      const enabled =
        authorized === messaging.AuthorizationStatus.AUTHORIZED ||
        authorized === messaging.AuthorizationStatus.PROVISIONAL

      if (enabled) {
        console.log('Authorization status:', authorized)
      }

      if (user?.id) {
        await messaging().subscribeToTopic(`${config.APP_ENV}_team_${user.id}`)
      }

      if (authorized) return fcmToken
      return null
    } catch (error) {
      console.log('GFTE', error) /*eslint-disable-line*/
      return null
    }
  }
}

const notificationService = new NotificationService()

export default notificationService
