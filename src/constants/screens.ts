const SCREENS = {
  AUTH_LOADING: 'AuthLoading',
  AUTH_STACK: {
    INDEX: 'AuthStack',
    SIGN_IN: 'SignIn',
    SIGN_UP: 'SignUp',
    FORGOT_PASSWORD: 'ForgotPassword',
    FORGOT_PASSWORD_SUCCESS: 'ForgotPasswordSuccess',
    RESET_PASSWORD: 'ResetPassword',
    RESET_PASSWORD_SUCCESS: 'ResetPasswordSuccess'
  },
  MAIN_STACK: {
    INDEX: 'MainStack',
    HOME_STACK: 'HomeStack',
    SETTINGS_STACK: 'SettingsStack'
  },
  HOME_STACK: {
    HOME: 'Home',
    CHANGE_PASSWORD: 'ChangePassword',
    EDIT_PROFILE: 'EditProfile'
  },
  SETTINGS_STACK: {
    SETTINGS: 'Settings'
  }
} as const

export default SCREENS
