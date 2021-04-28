import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { withInAppNotification } from 'react-native-in-app-notification';
import OfflineWarning from '../components/shared/OfflineWarning';
import { DEFAULT, NOTIFICATION, NOTIFICATION_ORIGIN, OS_TYPES } from '../constants';
import SCREENS from '../constants/screens';
import authService from '../services/AuthService';
import NavigationService from '../services/NavigationService';
import { notificationHandleService } from '../services/NotificationHandleService';
const NetworkInterceptor = ({ showNotification, children }) => {
  useEffect(() => {
    addNotificationListener();
  }, []);

  const addNotificationListener = async () => {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
    setUrlEventListener();

    if (Platform.OS === OS_TYPES.ANDROID) {
      Notifications.createChannelAndroidAsync(DEFAULT, {
        name: NOTIFICATION,
        sound: true
      });
    }
    Notifications.addNotificationReceivedListener(handleNotification);
  };

  const handleNotification = notification => {
    if (notification.origin === NOTIFICATION_ORIGIN.SELECTED) {
      notificationHandleService.handleOnClick(notification);
    } else {
      notificationHandleService.showInApp(
        notification,
        notification.notificationId,
        showNotification
      );
    }
  };

  const setUrlEventListener = () => {
    //If app is in background
    Linking.addEventListener('url', event => {
      let { queryParams } = Linking.parse(event.url);
      processUrlEvent(queryParams);
    });

    //If app is not open
    Linking.getInitialURL().then(url => {
      let { queryParams } = Linking.parse(url);
      processUrlEvent(queryParams);
    });
  };

  const processUrlEvent = async queryParams => {
    const accessToken = await authService.getAccessToken();
    if (queryParams.forgot_password_token) {
      NavigationService.navigate(SCREENS.AUTH_STACK.RESET_PASSWORD, {
        forgot_password_token: queryParams.forgot_password_token
      });
      return;
    }

    if (!accessToken) {
      NavigationService.navigate(SCREENS.AUTH_STACK.INDEX);
      return;
    }

    if (queryParams.notifications) {
      NavigationService.navigate('NotificationsScreen');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <OfflineWarning />
      {children}
    </View>
  );
};

NetworkInterceptor.propTypes = {
  children: PropTypes.any,
  showNotification: PropTypes.func
};

export default withInAppNotification(NetworkInterceptor);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
