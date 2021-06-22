import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { AuthStackParamsList } from 'types/navigation';
import SCREENS from 'constants/screens';
import ForgotPasswordScreen from 'screens/auth/ForgotPasswordScreen';
import ForgotPasswordSuccessScreen from 'screens/auth/ForgotPasswordSuccess';
import ResetPasswordScreen from 'screens/auth/ResetPasswordScreen';
import ResetPasswordSuccessScreen from 'screens/auth/ResetPasswordSuccess';
import SignInScreen from 'screens/auth/SignInScreen';
import SignUpScreen from 'screens/auth/SignUpScreen';

const StackNavigator = createStackNavigator<AuthStackParamsList>();

const noHeaderOptions: StackNavigationOptions = {
  headerShown: false,
};

const AuthStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name={SCREENS.AUTH_STACK.SIGN_IN} component={SignInScreen} />
      <StackNavigator.Screen name={SCREENS.AUTH_STACK.SIGN_UP} component={SignUpScreen} />
      <StackNavigator.Screen
        name={SCREENS.AUTH_STACK.FORGOT_PASSWORD}
        options={{ title: 'Forgot Password' }}
        component={ForgotPasswordScreen}
      />
      <StackNavigator.Screen
        name={SCREENS.AUTH_STACK.FORGOT_PASSWORD_SUCCESS}
        component={ForgotPasswordSuccessScreen}
        options={noHeaderOptions}
      />
      <StackNavigator.Screen
        name={SCREENS.AUTH_STACK.RESET_PASSWORD}
        component={ResetPasswordScreen}
      />
      <StackNavigator.Screen
        name={SCREENS.AUTH_STACK.RESET_PASSWORD_SUCCESS}
        component={ResetPasswordSuccessScreen}
        options={noHeaderOptions}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthStackNavigator;
