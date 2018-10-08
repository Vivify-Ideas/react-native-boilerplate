import React from 'react';
import { View, Text, Switch } from 'react-native';

const NotificationTypeComponent = ({ notificationType, onValueChange }) => {
  let { id, name, pushNotification } = notificationType;

  return (
    <View>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{JSON.stringify(pushNotification)}</Text>
      <Switch
        value={pushNotification}
        onValueChange={value => {
          pushNotification = !pushNotification;
          onValueChange(notificationType, value);
        }}
      />
    </View>
  );
};

export default NotificationTypeComponent;
