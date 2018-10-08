import React, { Component, Fragment } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import I18n from "../../i18n";
import Sentry from "sentry-expo";
import profileService from "../../services/api/ProfileService";
import withValidation from "../shared/HocWithValidation";
import validationRules from "../../validation/rules/profile";
import { connect } from "react-redux";
import { setActiveUser } from "../../store/actions/ActiveUserActions";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent";

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loader: false
  };

  handleUpdatePasswordRequest = async () => {
    if (!this.props.validate()) {
      return;
    }
    this.setState({ loader: true });
    try {
      await profileService.resetPassword({
        password: this.props.values.new_password,
        remember_token: this.props.navigation.getParam("remember_token")
      });

      this.props.navigation.replace("LogIn");
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
        {!this.state.loader && (
          <Fragment>
            <TextInput
              secureTextEntry={true}
              placeholder={I18n.t("common.enterNewPass")}
              autoCapitalize="none"
              autoCorrect={false}
              {...this.props.getFieldPropsFor("new_password")}
            />
            {this.props.errorMessageFor("new_password")}

            <TextInput
              secureTextEntry={true}
              placeholder={I18n.t("common.confirmPass")}
              autoCapitalize="none"
              autoCorrect={false}
              {...this.props.getFieldPropsFor("new_password_confirmation")}
            />
            {this.props.errorMessageFor("new_password_confirmation")}

            <View>
              <TouchableOpacity
                onPress={this.handleUpdatePasswordRequest}
                underlayColor="#fff"
              >
                <Text>{I18n.t("common.changePassword")}</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}

        {this.state.loader && (
          <ActivityIndicatorComponent animating={this.state.loader} />
        )}
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
)(
  withValidation(
    ResetPasswordScreen,
    { new_password: "", new_password_confirmation: "" },
    validationRules.resetPassword
  )
);
