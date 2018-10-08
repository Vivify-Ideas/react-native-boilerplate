import { Component } from 'react';
import { NetInfo } from 'react-native';
import NavigationService from '../services/NavigationService';
import { Linking } from 'expo';

class NetworkInterceptor extends Component {
  constructor(props) {
    super(props);
    this._connectionInfo();
    this._setUrlEventListener();
  }

  _connectionInfo = () => {
    NetInfo.isConnected.addEventListener('connectionChange', connectionInfo => {
      connectionInfo
        ? NavigationService.navigate('AuthLoading')
        : NavigationService.navigate('OfflineComponent');
    });
  };

  _setUrlEventListener = () => {
    //If app is in background
    Linking.addEventListener('url', event => {
      let { queryParams } = Linking.parse(event.url);
      this._processUrlEvent(queryParams.remember_token);
    });

    //If app is not open
    Linking.getInitialURL().then(url => {
      let { queryParams } = Linking.parse(url);
      this._processUrlEvent(queryParams.remember_token);
    });
  };

  _processUrlEvent(remember_token) {
    if (remember_token) {
      NavigationService.navigate('ResetPasswordScreen', { remember_token });
    }
  }

  render() {
    return this.props.children;
  }
}
export default NetworkInterceptor;
