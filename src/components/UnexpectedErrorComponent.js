import React from 'react';
import { View, Text } from 'react-native';
import I18n from '../i18n';

const UnexpectedErrorComponent = () => {
  return (
    <View>
      <Text>{I18n.t('errors.unexpected')}</Text>
    </View>
  );
};

export default UnexpectedErrorComponent;
