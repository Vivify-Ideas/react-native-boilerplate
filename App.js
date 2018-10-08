import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import store from './src/store/Store';
// import Sentry from 'sentry-expo';
// import { sentryPublicDsn } from './src/config';
import NetworkInterceptor from './src/containers/NetworkInterceptor';
import RootStack from './src/navigation';
import NavigationService from './src/services/NavigationService';
import { registerForPushNotificationsAsync } from './src/utils/ExpoPushToken';

export default class App extends Component {
  constructor() {
    super();
    registerForPushNotificationsAsync();
  }

  render() {
    return (
      <Provider store={store}>
        <NetworkInterceptor>
          <StatusBar barStyle="dark-content" />
          <RootStack
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </NetworkInterceptor>
      </Provider>
    );
  }
}

// Sentry.enableInExpoDevelopment = true;
// Sentry.config(sentryPublicDsn).install();
