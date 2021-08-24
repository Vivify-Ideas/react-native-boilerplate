import { AppState } from 'react-native';
import * as Notifications from 'expo-notifications';
import { APP_STATE } from '../constants';
import ApiService from './api/ApiService';

interface NotificationObject {
  data: {
    title: string;
    body: string;
    image: string;
  };
}

class NotificationHandleService extends ApiService {
  handleOnClick = (notification: NotificationObject): void => {
    console.log(notification); /*eslint-disable-line*/
  };

  showInApp = (
    notification: NotificationObject,
    id: string | number,
    showNotification: (notification: object) => void
  ): void => {
    if (AppState.currentState === APP_STATE.BACKGROUND) {
      return;
    } else {
      //Dismisses the notification from notification bar if app is opened
      Notifications.dismissNotificationAsync(id as string);
    }

    showNotification({
      title: notification.data.title,
      message: notification.data.body,
      icon: notification.data.image,
      onPress: () => this.handleOnClick(notification),
    });
  };
}

export const notificationHandleService = new NotificationHandleService();
