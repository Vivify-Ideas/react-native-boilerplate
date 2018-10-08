import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import I18n from '../i18n';

class OfflineComponent extends Component {
  render() {
    return (
      <View>
        <Image source={require('../../assets/images/blue-gradient-bg.svg')} />
        <Image source={require('../../assets/images/logo.svg')} />

        <Text>{I18n.t('auth.offline')}</Text>
      </View>
    );
  }
}
export default OfflineComponent;
