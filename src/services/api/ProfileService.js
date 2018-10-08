import BaseService from './BaseService';
import { AsyncStorage } from 'react-native';
import Sentry from 'sentry-expo';

const ENDPOINTS = {
  UPDATE: '/profile/me',
  PASSWORD_UPDATE: '/profile/me/password'
};

class ProfileService extends BaseService {
  updateProfile = (data) => {
    return this.apiClient().put(ENDPOINTS.UPDATE, data)
      .then(response => {
        try {
          AsyncStorage.setItem('user', JSON.stringify(response.data));

          return response.data;
        } catch (error) {
          Sentry.captureException(error);
        }
      });
  }

  updatePassword = (data) => {
    return this.apiClient().put(ENDPOINTS.PASSWORD_UPDATE, data);
  }
}

const profileService = new ProfileService();
export default profileService;