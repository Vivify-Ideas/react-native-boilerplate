const NotificationTypeController = require('../controllers/NotificationTypeController');

const authRoutes = [
  {
    method: 'GET',
    path: '/api/notificationTypes',
    config: {auth: false},
    handler: NotificationTypeController.getNotificationTypeHandler
  },
  {
    method: 'POST',
    path: '/api/notificationTypes',
    config: {auth: false},
    handler: NotificationTypeController.updateNotificationHandler
  }
];

module.exports = authRoutes;
