import BaseService from "./BaseService";
import { AsyncStorage } from "react-native";
import Expo from "expo";
import Sentry from "sentry-expo";
import config from "../../config";

const { androidClientId, iosClientId, facebookAppId } = config;

const ENDPOINTS = {
  LOGIN: "/login",
  LOGIN_SOCIAL: "/login-social",
  LOGOUT: "/logout",
  SIGN_UP: "/sign-up",
  RESET_PASSWORD: "/reset-password"
};

class AuthService extends BaseService {
  constructor() {
    super();
    this.init();
  }

  init = async () => {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      await this.setAuthorizationHeader();

      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    }
  };

  setAuthorizationHeader = async () => {
    const token = await this.getToken();

    if (token) {
      this.api.attachHeaders({
        Authorization: `Bearer ${token.value}`
      });
    }
  };

  createSession = async ({ token, user }) => {
    try {
      await AsyncStorage.setItem("token", JSON.stringify(token));
      await AsyncStorage.setItem("user", JSON.stringify(user));

      await this.setAuthorizationHeader();
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  destroySession = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    } catch (error) {
      Sentry.captureException(error);
    }

    this.api.removeHeaders(["Authorization"]);
  };

  login = async loginData => {
    try {
      const { data } = await this.apiClient().post(ENDPOINTS.LOGIN, loginData);
      await this.createSession(data);
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e };
    }
  };

  socialLogin = async loginPromise => {
    try {
      const result = await loginPromise;
      if (result.type === "success") {
        const { data } = await this.apiClient().post(
          ENDPOINTS.LOGIN_SOCIAL,
          result
        );
        await this.createSession(data);
        return { ok: true, data };
      }
      return { ok: false, error: result.type };
    } catch (e) {
      Sentry.captureException(e);
      return { ok: false, error: e };
    }
  };

  loginWithGoogle = async () => {
    return await this.socialLogin(
      Expo.Google.logInAsync({
        androidClientId,
        iosClientId,
        scopes: ["profile", "email"]
      })
    );
  };

  loginWithFacebook = async () => {
    return await this.socialLogin(
      Expo.Facebook.logInWithReadPermissionsAsync(facebookAppId, {
        permissions: ["public_profile", "email"]
      })
    );
  };

  logout = async () => {
    await this.apiClient().post(ENDPOINTS.LOGOUT);
    await this.destroySession();
  };

  resetPassword = ({ email }) => {
    return this.apiClient().post(ENDPOINTS.RESET_PASSWORD, { email });
  };

  signup = signupData => {
    return this.apiClient()
      .post(ENDPOINTS.SIGN_UP, signupData)
      .then(() => {
        const { email, password } = signupData;
        return this.login({ email, password });
      });
  };

  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return JSON.parse(token);
    } catch (error) {
      Sentry.captureException(error);
      return null;
    }
  };

  getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      return JSON.parse(user);
    } catch (error) {
      Sentry.captureException(error);
      return null;
    }
  };

  updateUserInStorage = async property => {
    try {
      const user = await AsyncStorage.getItem("user");
      let jsonUser = JSON.parse(user);
      jsonUser = { ...jsonUser, ...property };
      AsyncStorage.setItem("user", JSON.stringify(jsonUser));
    } catch (error) {
      Sentry.captureException(error);
      return null;
    }
  };
}

const authService = new AuthService();
export default authService;
