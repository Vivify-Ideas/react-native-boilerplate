import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import SCREENS from 'constants/screens';

// Root stack
export type RootDrawerParamList = {
  ProxyMainTab: undefined;
};

export type BottomTabNavigationProp = StackNavigationProp<
  RootDrawerParamList,
  'ProxyMainTab'
>;

// Bottom Stack
export type BottomTabParamList = {
  [SCREENS.MAIN_STACK.HOME_STACK]:
    | NavigatorScreenParams<HomeStackParamsList>
    | undefined;
  [SCREENS.MAIN_STACK.SETTINGS_STACK]:
    | NavigatorScreenParams<SettingsStackParamsList>
    | undefined;
};

// Settings Stack
export type SettingsStackParamsList = {
  [SCREENS.SETTINGS_STACK.SETTINGS]: { userId: string };
};

export type SettingsStackNavigationProp = StackNavigationProp<
  BottomTabParamList,
  'SettingsStack'
>;

// Settings Screen
export type SettingsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamsList, 'Settings'>,
  HomeStackNavigationProp
>;

export type SettingsScreenRouteProp = RouteProp<
  SettingsStackParamsList,
  'Settings'
>;

// Home Stack
export type HomeStackNavigationProp = StackNavigationProp<
  BottomTabParamList,
  'HomeStack'
>;

export type HomeStackParamsList = {
  [SCREENS.HOME_STACK.CHANGE_PASSWORD]: undefined;
  [SCREENS.HOME_STACK.EDIT_PROFILE]: undefined;
  [SCREENS.HOME_STACK.HOME]: undefined;
};

// Auth Stack
export type AuthStackParamsList = {
  [SCREENS.AUTH_STACK.SIGN_IN]: undefined;
  [SCREENS.AUTH_STACK.SIGN_UP]: undefined;
  [SCREENS.AUTH_STACK.FORGOT_PASSWORD]: undefined;
  [SCREENS.AUTH_STACK.FORGOT_PASSWORD_SUCCESS]: undefined;
  [SCREENS.AUTH_STACK.RESET_PASSWORD]: {
    forgot_password_token: string;
  };
  [SCREENS.AUTH_STACK.RESET_PASSWORD_SUCCESS]: undefined;
};

// SignUp Screen
export type SignUpScreenNavigationProp = StackNavigationProp<
  AuthStackParamsList,
  'SignIn'
>;

// Reset Password Success Screen
export type ResetPasswordSuccessScreenNavigationProp = StackNavigationProp<
  AuthStackParamsList,
  'ResetPasswordSuccess'
>;

// Reset Password Screen
export type ResetPasswordRouteProp = RouteProp<
  AuthStackParamsList,
  'ResetPassword'
>;

// Forgot Password Success Screen
export type ForgotPasswordSuccessNavigationProp = StackNavigationProp<
  AuthStackParamsList,
  'ForgotPasswordSuccess'
>;

// Others
