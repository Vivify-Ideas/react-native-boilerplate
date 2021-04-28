import * as Icon from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Sentry from '@sentry/react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import 'react-native-gesture-handler';
import { InAppNotificationProvider } from 'react-native-in-app-notification';
import { QueryClient, QueryClientProvider } from 'react-query';
import SCREENS from './constants/screens';
import UserContextProvider from './contexts/UserContext';
import AuthLoading from './navigation/AuthLoading';
import AuthStackNavigator from './navigation/AuthNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import NetworkInterceptor from './screens/NetworkInterceptor';
import NavigationService from './services/NavigationService';

Sentry.init({
  // dsn: 'https://key.sentry',
});

const queryClient = new QueryClient();
const StackNavigator = createStackNavigator();

const App = ({ skipLoadingScreen }) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const navigationRef = React.createRef();

  const handleLoadingError = error => {
    Sentry.captureException(error);
  };

  const handleFinishLoading = () => {
    setIsLoadingComplete(true);
  };

  const loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'montserrat-italic': require('../assets/fonts/Montserrat-Italic.ttf'),
        'montserrat-regular': require('../assets/fonts/Montserrat-Regular.ttf')
      })
    ]);
  };

  const disableFontScaling = async () => {
    Text.defaultProps = {
      allowFontScaling: false
    };
    TextInput.defaultProps = {
      allowFontScaling: false
    };
  };

  useEffect(() => {
    disableFontScaling();
  }, []);

  // If this doesn't work use useLayoutEffect instead useEffect
  useEffect(
    () => {
      NavigationService.setTopLevelNavigator(navigationRef);
    },
    [navigationRef]
  );

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <InAppNotificationProvider height={150}>
        <NavigationContainer>
          <UserContextProvider>
            <NetworkInterceptor>
              <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AuthLoading>
                  {({ isAuthenticated }) => (
                    <StackNavigator.Navigator headerMode="none">
                      {isAuthenticated ? (
                        <StackNavigator.Screen
                          name={SCREENS.MAIN_STACK.INDEX}
                          component={MainTabNavigator}
                        />
                      ) : (
                        <StackNavigator.Screen
                          name={SCREENS.AUTH_STACK.INDEX}
                          component={AuthStackNavigator}
                        />
                      )}
                    </StackNavigator.Navigator>
                  )}
                </AuthLoading>
              </View>
            </NetworkInterceptor>
          </UserContextProvider>
        </NavigationContainer>
      </InAppNotificationProvider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});

App.propTypes = {
  skipLoadingScreen: PropTypes.bool
};

export default App;
