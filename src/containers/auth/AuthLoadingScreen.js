import React, { Component } from 'react';
import { View, Image, AsyncStorage, ActivityIndicator, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { setActiveUser } from '../../store/actions/ActiveUserActions';
import AuthService from '../../services/api/AuthService';
import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent';

class AuthLoadingScreen extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    const user = await AuthService.getUser();
    this.props.setActiveUser(user);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'AppStack' : 'AuthStack');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Image source={require('../../../assets/images/blue-gradient-bg.svg')} />
        <Image source={require('../../../assets/images/logo.svg')} />
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <ActivityIndicatorComponent animating={true} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveUser: payload => dispatch(setActiveUser(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
