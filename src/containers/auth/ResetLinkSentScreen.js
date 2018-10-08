import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import I18n from '../../i18n';

class ResetLinkSentScreen extends Component {
  goToLogin = () => {
    this.props.navigation.navigate('LogIn');
  };

  render() {
    return (
      <View>
        <Image source={require('../../../assets/images/blue-gradient-bg.svg')} />
        <Image source={require('../../../assets/images/logo.svg')} />

        <Text>{I18n.t('auth.passwordResetSent')}</Text>

        <TouchableOpacity onPress={this.goToLogin}>
          <Text>{I18n.t('common.goBack')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default ResetLinkSentScreen;
