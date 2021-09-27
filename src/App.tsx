import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Sentry from '@sentry/react-native'
import SCREENS from 'constants/screens'
import UserContextProvider from 'contexts/UserContext'
import { NativeBaseProvider, View } from 'native-base'
import AuthLoading from 'navigation/AuthLoading'
import AuthStackNavigator from 'navigation/AuthNavigator'
import MainTabNavigator from 'navigation/MainTabNavigator'
import React, { useEffect, useRef } from 'react'
import { Platform, StatusBar, Text, TextInput } from 'react-native'
import 'react-native-gesture-handler'
import { InAppNotificationProvider } from 'react-native-in-app-notification'
import { QueryClient, QueryClientProvider } from 'react-query'
import NetworkInterceptor from 'screens/NetworkInterceptor'
import NavigationService from './services/NavigationService'
import { theme } from './themes'
import codePush from 'react-native-code-push'

Sentry.init({
  // dsn: 'https://key.sentry',
})

const queryClient = new QueryClient()
const StackNavigator = createStackNavigator()

const App = () => {
  const navigationRef = useRef(null)

  const disableFontScaling = (): void => {
    // @ts-expect-error Property 'defaultProps' does not exist on type 'typeof Text'
    Text.defaultProps = {
      allowFontScaling: false
    }
    // @ts-expect-error Property 'defaultProps' does not exist on type 'typeof TextInput'
    TextInput.defaultProps = {
      allowFontScaling: false
    }
  }

  useEffect(() => {
    disableFontScaling()
  }, [])

  // If this doesn't work use useLayoutEffect instead useEffect
  useEffect(() => {
    NavigationService.setTopLevelNavigator(navigationRef.current)
  }, [navigationRef])

  return (
    <QueryClientProvider client={queryClient}>
      <InAppNotificationProvider height={150}>
        <NavigationContainer ref={navigationRef}>
          <UserContextProvider>
            <NativeBaseProvider theme={theme}>
              <NetworkInterceptor>
                <View>
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
            </NativeBaseProvider>
          </UserContextProvider>
        </NavigationContainer>
      </InAppNotificationProvider>
    </QueryClientProvider>
  )
}

export default codePush(App)
