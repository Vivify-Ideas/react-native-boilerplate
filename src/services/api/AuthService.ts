// import * as Google from 'expo-google-app-auth';
// import * as Facebook from 'expo-facebook';
// import notificationService from './NotificationService';
import { Platform } from 'react-native'
import config from 'config'
import { OS_TYPES } from '../../constants'
import ApiService from './ApiService'
import asyncStorageService from '../AsyncStorageService'

const {
  ANDROID_GOOGLE_CLIENT_ID,
  IOS_GOOGLE_CLIENT_ID,
  FACEBOOK_APP_ID,
  CLIENT_ID
} = config

const ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGN_UP: '/auth/register',
  LOGOUT: '/auth/logout',
  FACEBOOK: '/auth/social/facebook',
  GOOGLE: '/auth/social/google',
  FORGOT_PASSWORD: '/user/forgot-password',
  RESET_PASSWORD: '/user/reset-password',
  REFRESH_TOKEN: '/auth/refresh'
}

type userCredentialsProp = {
  data: {
    firstName: string
    lastName: string
    avatar: string
    id: string
    token: string
  }
}

type forgotPasswordProp = {
  email: string
}

type newPasswordProp = {
  newPassword: string
}

type loginCredentials = {
  email: string
  password: string
}

type registerCredentials = {
  email: string
  password: string
}

type googleLoginCredentials = {
  type: string
  accessToken: string
}

type facebookLoginCredentials = {
  type: string
  token: string
}

type refreshTokenProp = {
  JwtToken: string
  JwtRefreshToken: string
}

class AuthService extends ApiService {
  constructor() {
    super()
    this.init()
  }

  init = async (): Promise<void> => {
    const token = await this.getAccessToken()
    const user = await this.getUser()

    if (token && user) {
      await this.setAuthorizationHeader()
      this.api.setUnauthorizedCallback(this.destroySession.bind(this))
    }
  }

  setAuthorizationHeader = async (): Promise<void> => {
    const accessToken = await this.getAccessToken()
    if (accessToken) {
      this.api.attachHeaders({
        Authorization: `Bearer ${accessToken}`
      })
    }

    this.api.attachHeaders({
      clientId: CLIENT_ID
    })
  }

  createSession = async (user: userCredentialsProp): Promise<void> => {
    await asyncStorageService.setItem('user', JSON.stringify(user))
    await this.setAuthorizationHeader()
    // const expoPushToken = await askForNotificationsPermissio();
    // if (expoPushToken) {
    // await asyncStorageService.setItem('expoPushToken', expoPushToken);
    // TODO this token need to be saved on BE
    // notificationService.sendExpoTokenToServer(expoPushToken);
    // }
  }

  destroySession = async (): Promise<void> => {
    await asyncStorageService.clear()
    this.api.removeHeaders(['Authorization'])
  }

  login = async (
    credentials: loginCredentials
  ): Promise<userCredentialsProp> => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, credentials)
    this.createSession(data)

    return data
  }

  googleLogin = async (
    loginPromise: Promise<googleLoginCredentials>
  ): Promise<userCredentialsProp> => {
    const result = await loginPromise
    if (result.type !== 'success') {
      throw new Error(result.type)
    }
    const { data } = await this.apiClient.post(ENDPOINTS.GOOGLE, {
      accessToken: result.accessToken
    })
    await this.createSession(data)

    return data
  }

  loginWithGoogle = async () => {
    return await this.googleLogin(
      // @ts-expect-error Cannot find name 'Google'
      Google.logInAsync({
        clientId:
          Platform.OS == OS_TYPES.IOS
            ? IOS_GOOGLE_CLIENT_ID
            : ANDROID_GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email']
      })
    )
  }

  facebookLogin = async (
    loginPromise: Promise<facebookLoginCredentials>
  ): Promise<userCredentialsProp> => {
    const result = await loginPromise
    if (result.type !== 'success') {
      throw new Error(result.type)
    }
    const { data } = await this.apiClient.post(ENDPOINTS.FACEBOOK, {
      accessToken: result.token
    })
    await this.createSession(data)

    return data
  }

  loginWithFacebook = async (): Promise<object> => {
    return await this.facebookLogin(
      // @ts-expect-error Cannot find name 'Facebook'
      Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email']
      })
    )
  }

  logout = async (): Promise<null> => {
    await this.apiClient.post(ENDPOINTS.LOGOUT)
    await this.destroySession()
    return null
  }

  forgotPassword = async ({ email }: forgotPasswordProp): Promise<null> => {
    await this.apiClient.post(ENDPOINTS.FORGOT_PASSWORD, { email })

    return null
  }

  resetPassword = async (data: newPasswordProp): Promise<null> => {
    await this.apiClient.post(ENDPOINTS.RESET_PASSWORD, data)
    return null
  }

  signup = async (
    signupData: registerCredentials
  ): Promise<userCredentialsProp> => {
    await this.apiClient.post(ENDPOINTS.SIGN_UP, signupData)
    const { email, password } = signupData
    return this.login({ email, password })
  }

  getAccessToken = async (): Promise<string | undefined | null> => {
    const user = await asyncStorageService.getItem('user')
    const jsonUser = JSON.parse(user)

    return user ? jsonUser.accessToken : undefined
  }

  getUser = async (): Promise<userCredentialsProp> => {
    const user = await asyncStorageService.getItem('user')
    const data = JSON.parse(user)
    return data
  }

  updateUserInStorage = async (property: object): Promise<void> => {
    const user = await asyncStorageService.getItem('user')
    let jsonUser = JSON.parse(user)
    jsonUser = { ...jsonUser, ...property }
    asyncStorageService.setItem('user', JSON.stringify(jsonUser))
  }

  refreshToken = async (payload: refreshTokenProp): Promise<null> => {
    const { data } = await this.apiClient.post(ENDPOINTS.REFRESH_TOKEN, payload)

    await this.createSession(data)

    return null
  }
}

const authService = new AuthService()

export default authService
