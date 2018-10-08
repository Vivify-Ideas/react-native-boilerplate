import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import I18n from '../../i18n';

class AuthScreen extends Component {
  render() {
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')}>
            <Text>{I18n.t('auth.login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text>{I18n.t('auth.signup')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default AuthScreen;
