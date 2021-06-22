import * as Sentry from '@sentry/react-native';
import axios, { AxiosInstance } from 'axios';
import config from 'config';
import asyncStorageService from '../AsyncStorageService';

class HttpService {
  client: AxiosInstance;
  unauthorizedCallback: () => void;

  constructor(options = {}) {
    this.client = axios.create(options);
    this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    this.unauthorizedCallback = () => {};
  }

  attachHeaders(headers: object): void {
    Object.assign(this.client.defaults.headers, headers);
  }

  removeHeaders(headerKeys: string[]): void {
    headerKeys.forEach((key) => delete this.client.defaults.headers[key]);
  }

  //@ts-ignore
  handleSuccessResponse(response) {
    return response;
  }

  // @ts-ignore
  handleErrorResponse = async (error) => {
    try {
      const { status } = error.response;

      Sentry.captureException(error);

      switch (status) {
        case 401:
          await asyncStorageService.clear();
          this.unauthorizedCallback();

          break;
        default:
          break;
      }

      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(error);
    }
  };

  setUnauthorizedCallback(callback: () => void) {
    this.unauthorizedCallback = callback;
  }
}

const options = {
  baseURL: config.API_BASE_URL,
};

const httpService = new HttpService(options);

export { HttpService };
export default httpService;
