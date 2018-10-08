import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../i18n';
import { setActiveUser } from '../../store/actions/ActiveUserActions';
import { updateProfile } from '../../store/actions/ProfileActions';
import withValidation from '../shared/HocWithValidation';
import validationRules from '../../validation/rules/profile';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const activeUser = this.props.activeUser;
    const name = activeUser ? activeUser.name : '';
    const email = activeUser ? activeUser.email : '';

    this.props.setValues({ name, email });
  };

  onSubmit = () => {
    this.props.updateProfile(this.props.values);
  };

  goToEditPassword = () => {
    this.props.navigation.navigate('EditPasswordScreen');
  };

  render() {
    return (
      <View>
        <Text>Edit Profile</Text>

        <TextInput
          placeholder={I18n.t('auth.enterName')}
          autoCapitalize="none"
          autoCorrect={false}
          {...this.props.getFieldPropsFor('name')}
        />
        {this.props.errorMessageFor('name')}

        <TextInput
          placeholder={I18n.t('auth.enterEmail')}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          {...this.props.getFieldPropsFor('email')}
        />
        {this.props.errorMessageFor('email')}

        <TouchableOpacity onPress={this.handleUpdateProfileRequest}>
          <Text>{I18n.t('common.updateProfile')}</Text>
        </TouchableOpacity>

        <TouchableHighlight onPress={this.goToEditPassword}>
          <Text>{I18n.t('common.changePassword')}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeUser: state.activeUser,
    errors: state.validationErrors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveUser: payload => dispatch(setActiveUser(payload)),
    updateProfile: payload => dispatch(updateProfile(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withValidation(EditProfileScreen, { name: '', email: '' }, validationRules.updateProfile));
