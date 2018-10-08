import BaseService from './BaseService';

const ENDPOINTS = {
  NOTIFICATIONS: './notifications',
  NOTIFICATION_TYPES: './notificationTypes',
  SEND_NOTIFICATION_TOKEN: '/notifications-token'
};

class NotificationService extends BaseService {

  getNotifications(startingIndexOfNextTwoNotifications, searchQuery) {
    return this.apiClient()
      .get(ENDPOINTS.NOTIFICATIONS + 
        '/' + startingIndexOfNextTwoNotifications +
        '/' + searchQuery);
  }

  getNotificationTypes() {
    return this.apiClient()
      .get(ENDPOINTS.NOTIFICATION_TYPES);
  }

  updateNotificationType(data) {
    return this.apiClient()
      .post(ENDPOINTS.NOTIFICATION_TYPES, data);
  }

  sendExpoTokenToServer(data) {
    return this.apiClient()
      .post(ENDPOINTS.SEND_NOTIFICATION_TOKEN, {pushToken:data});
  }
}

const notificationService = new NotificationService();
export default notificationService;
