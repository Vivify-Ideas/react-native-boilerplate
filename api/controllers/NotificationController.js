const notifications = require('../collections/notifications');
const Expo = require('expo-server-sdk');

const NUMBER_OF_NOTIFICATIONS = 2;

const getNotificationHandler = (request, reply) => {
  let index = request.params.index;
 
  let tempNotifications = request.params.search ? 
    getFilteredNotifications(index, request.params.search, reply) : notifications;
  const responseData = [];
  let iteration = 0;

  if (index >= tempNotifications.length) {
    return reply.response(responseData).code(204);
  }
  
  do {
    responseData.push(tempNotifications[index]);
    index++;
    iteration++;
  } while (index < tempNotifications.length && iteration < NUMBER_OF_NOTIFICATIONS);
  
  iteration = 0;
  return reply.response(responseData).code(200);
};

const getFilteredNotifications = (index, searchParam, reply) => {

  let filteredNotifications = [];
  notifications.forEach(notification => {
    if (notificationContainSearchParam(notification, searchParam)) {
      filteredNotifications.push(notification);
    }
  });
  return filteredNotifications;
};

const notificationContainSearchParam = (notification, searchParam) => {
  let title = notification.title.toLowerCase();
  let message = notification.message.toLowerCase();
  return title.includes(searchParam) || message.includes(searchParam);
};

const createNotificationHandler = (request, reply) => {
  const {type, title, message} = request.payload;

  const notificationsCount = notifications.length;
  const lastNotificationId = notificationsCount ? notifications[notificationsCount - 1].id : 0;
  const notification = {
    id: lastNotificationId + 1,
    type,
    title,
    message
  };

  notifications.push(notification);
  const responseData = notification;
  return reply.response(responseData).code(200);
};

const editNotificationHandler = (request, reply) => {
  const {id, type, title, message} = request.payload;

  let responseData = null;
  notifications.forEach(notification => {
    if (notification.id == id) {
      notification.type = type;
      notification.title = title;
      notification.message = message;
      responseData = notification;
    }
  });
  return reply.response(responseData).code(200);
};

const deleteNotificationHandler = (request, reply) => {
  const notificationToDeleteId = request.params.notificationID;

  notifications.forEach(notification => {
    if (notification.id == notificationToDeleteId) {
      let index = notifications.indexOf(notification);
      if (index > -1) {
        notifications.splice(index, 1);
      }
    }
  });
  return reply.response().code(204);
};

const saveExpoTokenHandler = (request, reply) => {
  const {pushToken} = request.payload;
  
  let expo = new Expo();

  let messages = [];
  let somePushTokens = [pushToken];
  
  for (let pushToken of somePushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
  
    messages.push({
      to: pushToken,
      sound: 'default',
      body: 'Welcome to react-native boilerplate',
      data: { withSome: 'data' },
    });
  }
  
  let chunks = expo.chunkPushNotifications(messages);
  
  (async () => {
  
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
  return reply.response().code(200);
};

module.exports = {
  getNotificationHandler,
  createNotificationHandler,
  editNotificationHandler,
  deleteNotificationHandler,
  saveExpoTokenHandler
};
