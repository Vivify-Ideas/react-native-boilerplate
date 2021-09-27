import { showReportDialog } from '@sentry/browser'
import { AppState } from 'react-native'
import { APP_STATE } from './../constants'
import ApiService from './api/ApiService'

interface NotificationObject {
  data: { [key: string]: string }
}

interface ShowNotificationProps {
  title: string
  message: string
  icon: string
  onPress(): void
}

class NotificationHandleService extends ApiService {
  handleOnClick = (notification?: { [key: string]: string }): void => {
    console.log(notification)
  }

  showInApp = (
    notification: NotificationObject,
    id: string | number,
    showNotification: (notification: ShowNotificationProps) => void
  ): void => {
    if (AppState.currentState === APP_STATE.BACKGROUND) {
      return
    } else {
      //Dismisses the notification from notification bar if app is opened
      // dismissNotificationAsync(id as string);
    }

    showNotification({
      title: notification.data.title,
      message: notification.data.body,
      icon: notification.data.image,
      onPress: () => this.handleOnClick(notification.data)
    })
  }
}

export const notificationHandleService = new NotificationHandleService()
