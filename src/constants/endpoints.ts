export default {
  LOGIN: '/api/v1/token/',
  SIGN_UP: '/api/v1/users/',
  EDIT_USER: '/api/v1/users/:id/',
  ME: '/api/v1/users/me/',
  FACEBOOK: '/api/v1/social/facebook',
  GOOGLE: '/api/v1/social/google',
  REFRESH_TOKEN: '/api/v1/token/refresh/',
  START_PASSWORD_RECOVERY: '/api/v1/password_reset/',
  VALIDATE_PASSWORD_RECOVERY_TOKEN: '/api/v1/password_reset/validate_token/',
  CONFIRM_PASSWORD_RECOVERY: '/api/v1/password_reset/confirm/',
  CHANGE_PASSWORD: '/api/v1/change_password/',
  SEND_EXPO_TOKEN: '/exponent/devices/subscribe',
  REMOVE_EXPO_TOKEN: '/exponent/devices/unsubscribe'
}
