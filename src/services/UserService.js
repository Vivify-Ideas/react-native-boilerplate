import ApiService from './ApiService';

const ENDPOINTS = {
  ME: '/api/auth/me',
  CHANGE_PASSWORD: '/user/change-password',
  USER: '/api/user/update'
};

class UserService extends ApiService {
  me = () => this.apiClient.get(ENDPOINTS.ME);

  edit = data => {
    const formData = new FormData();
    if (data.avatar) {
      const { uri } = data.avatar;
      const name = uri.split('/').pop();
      const type = 'image/jpeg';
      formData.append('avatar', { uri, name, type });
    }

    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);

    return this.apiClient.post(ENDPOINTS.USER, formData);
  };

  changePassword = data => this.apiClient.post(ENDPOINTS.CHANGE_PASSWORD, data);
}

const userService = new UserService();
export default userService;
