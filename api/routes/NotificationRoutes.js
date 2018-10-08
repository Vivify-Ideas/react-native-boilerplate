const NotificationController = require('../controllers/NotificationController');

const authRoutes = [
  {
    method: 'GET',
    path: '/api/notifications/{index}/{search?}',
    config: {auth: false},
    handler: NotificationController.getNotificationHandler
  },
  {
    method: 'POST',
    path: '/api/notifications',
    config: {auth: false},
    handler: NotificationController.createNotificationHandler
  },
  {
    method: 'POST',
    path: '/api/notifications-token',
    config: {auth: false},
    handler: NotificationController.saveExpoTokenHandler
  },
  {
    method: 'PUT',
    path: '/api/notifications',
    config: {auth: false},
    handler: NotificationController.editNotificationHandler
  },
  {
    method: 'DELETE',
    path: '/api/notifications/{notificationID}',
    config: {auth: false},
    handler: NotificationController.deleteNotificationHandler
  }
];

module.exports = authRoutes;
