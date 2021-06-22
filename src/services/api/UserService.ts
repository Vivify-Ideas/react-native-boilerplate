import { UserI } from 'types';
import ApiService from './ApiService';

const ENDPOINTS = {
  ME: '/api/auth/me',
  CHANGE_PASSWORD: '/user/change-password',
  USER: '/api/user/update',
};

class UserService extends ApiService {
  me = async (): Promise<UserI> => {
    const { data } = await this.apiClient.get(ENDPOINTS.ME);
    return data;
  };

  edit = async (data: {
    avatar: { uri: string };
    firstName: string;
    lastName: string;
  }): Promise<UserI> => {
    const formData = new FormData();
    if (data.avatar) {
      const { uri } = data.avatar;
      const name = uri.split('/').pop();
      const type = 'image/jpeg';
      formData.append('avatar', { uri, name, type });
    }

    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);

    const { data: responseData } = await this.apiClient.post(ENDPOINTS.USER, formData);

    return responseData;
  };

  changePassword = async (data: object): Promise<void> => {
    this.apiClient.post(ENDPOINTS.CHANGE_PASSWORD, data);
  };
}

const userService = new UserService();
export default userService;
