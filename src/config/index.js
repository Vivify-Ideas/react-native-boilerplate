import {
  API_BASE_URL,
  API_SERVER_PORT,
  SENTRY_PUBLIC_DSN,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  FACEBOOK_APP_ID
} from 'react-native-dotenv';

const config = {
  API_BASE_URL: API_BASE_URL,
  API_SERVER_PORT: API_SERVER_PORT,
  sentryPublicDsn: SENTRY_PUBLIC_DSN,
  androidClientId: ANDROID_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  facebookAppId: FACEBOOK_APP_ID
};

export default config;
