import React, { Component } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import Sentry from 'sentry-expo';
import I18n from '../../i18n';
import profileService from '../../services/api/ProfileService';
import withValidation from '../shared/HocWithValidation';
import validationRules from '../../validation/rules/profile';

class EditPasswordScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleUpdatePasswordRequest = async () => {
    try {
      await profileService.updatePassword(this.props.values);

      this.props.navigation.navigate('EditProfileScreen');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        this.props.resetErrors(error.response.data);
      } else {
        Sentry.captureException(error);
      }
    }
  };

  render() {
    return (
      <View>
        <Image source={require('../../../assets/images/blue-gradient-bg.svg')} />
        <Image source={require('../../../assets/images/logo.svg')} />

        <Text>Change Password</Text>

        <TextInput
          placeholder={I18n.t('common.enterCurrentPass')}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          {...this.props.getFieldPropsFor('oldPassword')}
        />
        {this.props.errorMessageFor('oldPassword')}

        <TextInput
          secureTextEntry={true}
          placeholder={I18n.t('common.enterNewPass')}
          autoCapitalize="none"
          autoCorrect={false}
          {...this.props.getFieldPropsFor('newPassword')}
        />
        {this.props.errorMessageFor('newPassword')}

        <TouchableOpacity onPress={this.handleUpdatePasswordRequest}>
          <Text>{I18n.t('common.changePassword')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withValidation(
  EditPasswordScreen,
  { oldPassword: '', newPassword: '' },
  validationRules.updatePassword
);
