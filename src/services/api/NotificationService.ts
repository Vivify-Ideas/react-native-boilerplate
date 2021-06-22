import ApiService from './ApiService';
import asyncStorageService from '../AsyncStorageService';

const ENDPOINTS = {
  NOTIFICATIONS: '/profiles/me/notifications',
  NOTIFICATION_SETTINGS: '/users/notifications/settings',
  SEND_EXPO_TOKEN: '/exponent/devices/subscribe',
  REMOVE_EXPO_TOKEN: '/exponent/devices/unsubscribe',
};

class NotificationService extends ApiService {
  getNotifications = (): Promise<object> => this.apiClient.get(ENDPOINTS.NOTIFICATIONS);

  getNotificationSettings = (): Promise<object> =>
    this.apiClient.get(ENDPOINTS.NOTIFICATION_SETTINGS);

  updateNotificationSettings = (data: object): Promise<object> =>
    this.apiClient.put(ENDPOINTS.NOTIFICATION_SETTINGS, data);

  sendExpoTokenToServer = (expoPushToken: string): Promise<object> =>
    this.apiClient.post(ENDPOINTS.SEND_EXPO_TOKEN, {
      expo_token: expoPushToken,
    });

  removeExpoTokenFromServer = async (): Promise<void> => {
    try {
      const expoPushToken = await asyncStorageService.getItem('expoPushToken');
      this.apiClient.post(ENDPOINTS.REMOVE_EXPO_TOKEN, {
        secret: expoPushToken,
      });
    } catch {
      return;
    }
  };
}

const notificationService = new NotificationService();

export default notificationService;
