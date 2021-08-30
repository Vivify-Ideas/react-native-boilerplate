import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, TextInput } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as Icon from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Sentry from '@sentry/react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { NativeBaseProvider, extendTheme, View } from 'native-base';
import { InAppNotificationProvider } from 'react-native-in-app-notification';
import UserContextProvider from 'contexts/UserContext';
import AuthLoading from 'navigation/AuthLoading';
import AuthStackNavigator from 'navigation/AuthNavigator';
import MainTabNavigator from 'navigation/MainTabNavigator';
import SCREENS from 'constants/screens';
import NetworkInterceptor from 'screens/NetworkInterceptor';
import NavigationService from './services/NavigationService';

Sentry.init({
  // dsn: 'https://key.sentry',
});

const queryClient = new QueryClient();
const StackNavigator = createStackNavigator();

type AppProps = {
  skipLoadingScreen: boolean;
};

const App = ({ skipLoadingScreen }: AppProps) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);
  const navigationRef = useRef(null);

  const handleLoadingError = (error: object): void => {
    Sentry.captureException(error);
  };

  const handleFinishLoading = (): void => {
    setIsLoadingComplete(true);
  };

  const loadResourcesAsync = async (): Promise<any> => {
    return Promise.all([
      Asset.loadAsync([
        require('assets/images/robot-dev.png'),
        require('assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('assets/fonts/SpaceMono-Regular.ttf'),
        'montserrat-bold': require('assets/fonts/Montserrat-Bold.ttf'),
        'montserrat-italic': require('assets/fonts/Montserrat-Italic.ttf'),
        'montserrat-regular': require('assets/fonts/Montserrat-Regular.ttf'),
      }),
    ]);
  };

  const theme = extendTheme({
    // This is for the Dark theme that the user chooses
    components: {
      Text: {
        // For all the Text components
        baseStyle: ({ colorMode }) => {
          return {
            color: colorMode === 'light' ? '#333' : '#fff',
          };
        },
      },
      View: {
        baseStyle: ({ colorMode }: any) => {
          return {
            flex: 1,
            bg: colorMode === 'light' ? '#fff' : '#333',
          };
        },
      },
    },
  });

  const disableFontScaling = (): void => {
    // @ts-ignore
    Text.defaultProps = {
      allowFontScaling: false,
    };
    // @ts-ignore
    TextInput.defaultProps = {
      allowFontScaling: false,
    };
  };

  useEffect(() => {
    disableFontScaling();
  }, []);

  // If this doesn't work use useLayoutEffect instead useEffect
  useEffect(() => {
    NavigationService.setTopLevelNavigator(navigationRef.current);
  }, [navigationRef]);

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
        <NavigationContainer ref={navigationRef}>
          <UserContextProvider>
            <NetworkInterceptor>
              <NativeBaseProvider theme={theme}>
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
              </NativeBaseProvider>
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
    flex: 1,
  },
});

export default App;
