import React from 'react';
import { View, Text } from 'react-native';

const Notification = ({ notification }) => {
  const { id, message, title, type } = notification;
  return (
    <View>
      <Text>{id}</Text>
      <Text>{message}</Text>
      <Text>{title}</Text>
      <Text>{type}</Text>
    </View>
  );
};

export default Notification;
