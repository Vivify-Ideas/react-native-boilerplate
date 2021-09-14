import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack'
import $t from 'i18n'
import { AuthStackParamsList } from 'types/navigation'
import SCREENS from 'constants/screens'
import ForgotPasswordScreen from 'screens/auth/ForgotPasswordScreen'
import ForgotPasswordSuccessScreen from 'screens/auth/ForgotPasswordSuccess'
import ResetPasswordScreen from 'screens/auth/ResetPasswordScreen'
import ResetPasswordSuccessScreen from 'screens/auth/ResetPasswordSuccess'
import SignInScreen from 'screens/auth/SignInScreen'
import SignUpScreen from 'screens/auth/SignUpScreen'

const StackNavigator = createStackNavigator<AuthStackParamsList>()

const noHeaderOptions: StackNavigationOptions = {
  headerShown: false
}

const AuthStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={SCREENS.AUTH_STACK.SIGN_IN}
        component={SignInScreen}
      />
      <StackNavigator.Screen
        name={SCREENS.AUTH_STACK.SIGN_UP}
        component={SignUpScreen}
      />
      <StackNavigator.Screen
        name={SCREENS.AUTH_STACK.FORGOT_PASSWORD}
        options={{ title: $t('auth.forgotPassword') }}
        component={ForgotPasswordScreen}
      />
      <StackNavigator.Screen
        name={SCREENS.AUTH_STACK.RESET_PASSWORD}
        component={ResetPasswordScreen}
      />
      <StackNavigator.Group screenOptions={noHeaderOptions}>
        <StackNavigator.Screen
          name={SCREENS.AUTH_STACK.FORGOT_PASSWORD_SUCCESS}
          component={ForgotPasswordSuccessScreen}
        />
        <StackNavigator.Screen
          name={SCREENS.AUTH_STACK.RESET_PASSWORD_SUCCESS}
          component={ResetPasswordSuccessScreen}
        />
      </StackNavigator.Group>
    </StackNavigator.Navigator>
  )
}

export default AuthStackNavigator
