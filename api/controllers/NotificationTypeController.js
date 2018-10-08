const notificationTypes = require('../collections/notificationTypes');

const getNotificationTypeHandler = (request, reply) => {
  return reply.response(notificationTypes).code(200);
};

const updateNotificationHandler = (request, reply) => {
  const {id, name, pushNotification} = request.payload;

  let responseData = null;
  notificationTypes.forEach(notificationType => {
    if (notificationType.id == id) {
      notificationType.name = name;
      notificationType.pushNotification = pushNotification;
      responseData = notificationType;
    }
  });
  return reply.response(responseData).code(200);
};

module.exports = {
  getNotificationTypeHandler,
  updateNotificationHandler
};
