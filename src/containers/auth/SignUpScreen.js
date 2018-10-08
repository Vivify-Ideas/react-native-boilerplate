import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import Sentry from 'sentry-expo';
import I18n from '../../i18n';
import authService from '../../services/api/AuthService';
import withValidation from '../shared/HocWithValidation';
import validationRules from '../../validation/rules/signup';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
  }

  goToLoginPage = () => {
    this.props.navigation.navigate('LogIn');
  };

  signUp = async () => {
    if (!this.props.validate()) {
      return;
    }

    try {
      await authService.signup(this.props.values);
      this.props.navigation.navigate('HomeScreen');
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

        <Text>Sign Up</Text>

        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          placeholder={I18n.t('auth.enterName')}
          {...this.props.getFieldPropsFor('name')}
        />
        <Text>{this.props.errorMessageFor('name')}</Text>

        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={I18n.t('auth.enterEmail')}
          {...this.props.getFieldPropsFor('email')}
        />
        <Text>{this.props.errorMessageFor('email')}</Text>

        <TextInput
          secureTextEntry={true}
          placeholder={I18n.t('auth.enterPass')}
          {...this.props.getFieldPropsFor('password')}
        />
        <Text>{this.props.errorMessageFor('password')}</Text>

        <View>
          <TouchableHighlight onPress={this.goToLoginPage}>
            <Text>{I18n.t('auth.haveAccountLogIn')}</Text>
          </TouchableHighlight>

          <TouchableOpacity onPress={this.signUp}>
            <Text>{I18n.t('auth.signup')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default withValidation(SignUpScreen, { name: '', email: '', password: '' }, validationRules);
