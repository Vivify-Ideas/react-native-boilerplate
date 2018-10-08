import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import geolocationService from '../services/GeolocationService';
import authService from '../services/api/AuthService';
import I18n from '../i18n';

class Home extends React.Component {
  static navigationOptions = {
    title: I18n.t('common.home')
  };

  constructor() {
    super();
    this.getLocation();
    this.state = { location: '' };
  }
  getLocation() {
    geolocationService.getGeolocation().then(res => {
      this.setState({ location: JSON.stringify(res) });
    });
  }

  logout = () => {
    authService.logout();
    this.props.navigation.navigate('AuthStack');
  };

  render() {
    return (
      <View>
        <Text>{this.state.location}</Text>

        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('NotificationListScreen')}
        >
          <Text>{I18n.t('notifications.notificationsHeader')}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('NotificationSettingsScreen')}
        >
          <Text>{I18n.t('notifications.notificationSettingsHeader')}</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
          <Text>{I18n.t('common.editProfile')}</Text>
        </TouchableHighlight>

        <TouchableOpacity onPress={this.logout}>
          <Text>{I18n.t('auth.logout')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Home;
