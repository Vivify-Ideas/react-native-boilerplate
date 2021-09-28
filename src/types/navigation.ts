import { NavigatorScreenParams, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import SCREENS from 'constants/screens'

type ValueOf<T> = T[keyof T]

// Root stack
export type RootDrawerParamList = {
  ProxyMainTab: undefined
}

// Bottom Stack
export type BottomTabParamList = {
  [SCREENS.MAIN_STACK.HOME_STACK]:
    | NavigatorScreenParams<HomeStackParamsList>
    | undefined
  [SCREENS.MAIN_STACK.SETTINGS_STACK]:
    | NavigatorScreenParams<SettingsStackParamsList>
    | undefined
}

// Settings Stack
type SettingsStackParams = ValueOf<typeof SCREENS.SETTINGS_STACK>

export type SettingsStackParamsList = {
  [keys in SettingsStackParams]: unknown
} & {
  Settings: { userId: string }
}

export type SettingsScreenRouteProp = RouteProp<
  SettingsStackParamsList,
  'Settings'
>

// Home Stack
type HomeStackParams = ValueOf<typeof SCREENS.HOME_STACK>

export type HomeStackParamsList = {
  [keys in HomeStackParams]: undefined
}

// Auth Stack
type AuthStackParams = ValueOf<typeof SCREENS.AUTH_STACK>

export type AuthStackParamsList = Omit<
  {
    [keys in AuthStackParams]: undefined
  },
  'ResetPassword'
> & {
  [SCREENS.AUTH_STACK.RESET_PASSWORD]: {
    forgot_password_token: string
  }
}

// SignUp Screen
export type SignUpScreenNavigationProp = StackNavigationProp<
  AuthStackParamsList,
  'SignIn'
>

// Reset Password Success Screen
export type ResetPasswordSuccessScreenNavigationProp = StackNavigationProp<
  AuthStackParamsList,
  'ResetPasswordSuccess'
>

// Reset Password Screen
export type ResetPasswordRouteProp = RouteProp<
  AuthStackParamsList,
  'ResetPassword'
>

// Forgot Password Success Screen
export type ForgotPasswordSuccessNavigationProp = StackNavigationProp<
  AuthStackParamsList,
  'ForgotPasswordSuccess'
>

// Others
