import config from '../config'

export default {
  LOGIN: config.API_BASE_URL + '/api/v1/token/',
  SIGN_UP: config.API_BASE_URL + '/api/v1/users/',
  EDIT_USER: config.API_BASE_URL + '/api/v1/users/',
  ME: config.API_BASE_URL + '/api/v1/users/me/',
  LOGOUT: config.API_BASE_URL + '/auth/logout',
  FACEBOOK: config.API_BASE_URL + '/api/v1/social/facebook',
  GOOGLE: config.API_BASE_URL + '/api/v1/social/google',
  REFRESH_TOKEN: config.API_BASE_URL + '/api/v1/token/refresh/',
  START_PASSWORD_RECOVERY: config.API_BASE_URL + '/api/v1/password_reset/',
  VALIDATE_PASSWORD_RECOVERY_TOKEN:
    config.API_BASE_URL + '/api/v1/password_reset/validate_token/',
  CONFIRM_PASSWORD_RECOVERY:
    config.API_BASE_URL + '/api/v1/password_reset/confirm/',
  FORGOT_PASSWORD: config.API_BASE_URL + '/user/forgot-password',
  RESET_PASSWORD: config.API_BASE_URL + '/api/v1/password_reset/',
  CHANGE_PASSWORD: config.API_BASE_URL + '',
  SEND_EXPO_TOKEN: '/exponent/devices/subscribe',
  REMOVE_EXPO_TOKEN: '/exponent/devices/unsubscribe'
}
