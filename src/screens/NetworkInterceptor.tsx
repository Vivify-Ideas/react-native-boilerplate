//@ts-nocheck
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { withInAppNotification } from 'react-native-in-app-notification';
import OfflineWarning from 'components/shared/OfflineWarning';
import { DEFAULT, NOTIFICATION, NOTIFICATION_ORIGIN, OS_TYPES } from 'constants';
import SCREENS from 'constants/screens';
import authService from 'services/api/AuthService';
import NavigationService from 'services/NavigationService';
import { notificationHandleService } from 'services/NotificationHandleService';

type NetworkInterceptorProps = {
  showNotification: (notification: object) => void;
  children: any;
};

const NetworkInterceptor = ({ showNotification, children }: NetworkInterceptorProps) => {
  useEffect(() => {
    addNotificationListener();
  }, []);

  const addNotificationListener = async (): Promise<void> => {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
    setUrlEventListener();

    if (Platform.OS === OS_TYPES.ANDROID) {
      Notifications.createChannelAndroidAsync(DEFAULT, {
        name: NOTIFICATION,
        sound: true,
      });
    }
    Notifications.addNotificationReceivedListener(handleNotification);
  };

  const handleNotification = (notification: any): void => {
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
    Linking.addEventListener('url', (event) => {
      const { queryParams } = Linking.parse(event.url);
      processUrlEvent(queryParams);
    });

    //If app is not open
    Linking.getInitialURL().then((url) => {
      const { queryParams } = Linking.parse(url);
      processUrlEvent(queryParams);
    });
  };

  const processUrlEvent = async (queryParams) => {
    const accessToken = await authService.getAccessToken();
    if (queryParams.forgot_password_token) {
      NavigationService.navigate(SCREENS.AUTH_STACK.RESET_PASSWORD, {
        forgot_password_token: queryParams.forgot_password_token,
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

export default withInAppNotification(NetworkInterceptor);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
