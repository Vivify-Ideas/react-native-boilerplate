//@ts-nocheck
import React, { useEffect } from 'react'
import { Linking } from 'react-native'
import { View } from 'native-base'
import { withInAppNotification } from 'react-native-in-app-notification'
import OfflineWarning from 'components/shared/OfflineWarning'
import { DEFAULT, NOTIFICATION, NOTIFICATION_ORIGIN, OS_TYPES } from 'constants'
import SCREENS from 'constants/screens'
import authService from 'services/api/AuthService'
import NavigationService from 'services/NavigationService'
import { notificationHandleService } from 'services/NotificationHandleService'
import { askForNotificationsPermission } from 'services/PermissionServiceNative'

type NetworkInterceptorProps = {
  showNotification: (notification: NotificationObject) => void
  children: React.ReactNode
}

const NetworkInterceptor = ({
  showNotification,
  children
}: NetworkInterceptorProps) => {
  useEffect(() => {
    addNotificationListener()
  }, [])

  const addNotificationListener = async (): Promise<void> => {
    askForNotificationsPermission()
  }

  const handleNotification = (notification: NotificationObject): void => {
    if (notification.origin === NOTIFICATION_ORIGIN.SELECTED) {
      notificationHandleService.handleOnClick(notification)
    } else {
      notificationHandleService.showInApp(
        notification,
        notification.notificationId,
        showNotification
      )
    }
  }

  const setUrlEventListener = () => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url)

      if (supported) {
        Linking.addEventListener('url', event => {
          const { queryParams } = Linking.parse(event.url)
          processUrlEvent(queryParams)
        })

        //If app is not open
        Linking.getInitialURL().then(url => {
          const { queryParams } = Linking.parse(url)
          processUrlEvent(queryParams)
        })
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`)
      }
    }, [url])
  }

  const processUrlEvent = async queryParams => {
    const accessToken = await authService.getAccessToken()
    if (queryParams.forgot_password_token) {
      NavigationService.navigate(SCREENS.AUTH_STACK.RESET_PASSWORD, {
        forgot_password_token: queryParams.forgot_password_token
      })
      return
    }

    if (!accessToken) {
      NavigationService.navigate(SCREENS.AUTH_STACK.INDEX)
      return
    }

    if (queryParams.notifications) {
      NavigationService.navigate('NotificationsScreen')
      return
    }
  }

  return (
    <View>
      <OfflineWarning />
      {children}
    </View>
  )
}

export default withInAppNotification(NetworkInterceptor)
