import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text } from 'react-native';
import I18n from '../../i18n';
import authService from '../../services/api/AuthService';
import Sentry from 'sentry-expo';
import withValidation from '../shared/HocWithValidation';
import validationRules from '../../validation/rules/login';

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
  }

  sendResetPasswordEmail = async () => {
    if (!this.props.validate()) {
      return;
    }

    try {
      await authService.resetPassword(this.props.values);
      this.props.navigation.navigate('ResetLinkSent');
    } catch (e) {
      if (e.response && e.response.status === 422) {
        this.props.resetErrors(e.response.data);
      } else {
        Sentry.captureException(e);
      }
    }
  };

  render() {
    return (
      <View>
        <Image source={require('../../../assets/images/blue-gradient-bg.svg')} />
        <Image source={require('../../../assets/images/logo.svg')} />

        <Text>Forgotten Password</Text>

        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={I18n.t('auth.enterEmail')}
          {...this.props.getFieldPropsFor('email')}
        />
        <Text>{this.props.errorMessageFor('email')}</Text>

        <TouchableOpacity onPress={this.sendResetPasswordEmail}>
          <Text>{I18n.t('auth.resetPassword')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withValidation(
  ForgotPasswordScreen,
  { email: '' },
  { email: validationRules.email }
);
