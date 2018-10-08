import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import Sentry from 'sentry-expo';
import { connect } from 'react-redux';
import I18n from '../../i18n';
import authService from '../../services/api/AuthService';
import withValidation from '../shared/HocWithValidation';
import validationRules from '../../validation/rules/login';
import { setActiveUser } from '../../store/actions/ActiveUserActions';

class LogInScreen extends Component {
  constructor(props) {
    super(props);
  }

  goToSignUpScreen = () => {
    this.props.navigation.navigate('SignUp');
  };

  goToForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  generalLogin = async loginPromise => {
    try {
      let result = await loginPromise;
      if (result.ok) {
        this.props.setActiveUser(result.data.user);
        this.props.navigation.navigate('HomeScreen');
      } else if (result.error && result.error.response) {
        this.props.resetErrors(result.error.response.data);
      }
    } catch (e) {
      if (e.response && e.response.status === 422) {
        this.props.resetErrors(e.response.data);
      } else {
        Sentry.captureException(e);
      }
    }
  };

  logIn = async () => {
    if (!this.props.validate()) {
      return;
    }

    return await this.generalLogin(authService.login(this.props.values));
  };

  googleSignIn = async () => {
    return await this.generalLogin(authService.loginWithGoogle());
  };

  fbSignIn = async () => {
    return await this.generalLogin(authService.loginWithFacebook());
  };

  render() {
    return (
      <View>
        <Image source={require('../../../assets/images/blue-gradient-bg.svg')} />
        <Image source={require('../../../assets/images/logo.svg')} />

        <Text>Log In</Text>

        <TextInput
          placeholder={I18n.t('auth.enterEmail')}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          {...this.props.getFieldPropsFor('email')}
        />
        <Text>{this.props.errorMessageFor('email')}</Text>

        <TextInput
          placeholder={I18n.t('auth.enterPass')}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          {...this.props.getFieldPropsFor('password')}
        />
        <Text>{this.props.errorMessageFor('password')}</Text>

        <View style={{ textAlign: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={this.logIn}>
            <Text>{I18n.t('auth.login')}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={this.googleSignIn}>
            <Text>{I18n.t('auth.loginWithGoogle')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.fbSignIn}>
            <Text>{I18n.t('auth.loginWithFacebook')}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableHighlight onPress={this.goToForgotPassword}>
            <Text>{I18n.t('auth.forgotPassword')}</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.goToSignUpScreen}>
            <Text>{I18n.t('auth.noAccountSignUp')}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeUser: state.activeUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveUser: payload => dispatch(setActiveUser(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withValidation(LogInScreen, { email: '', password: '' }, validationRules));
