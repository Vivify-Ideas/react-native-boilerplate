// import * as Google from 'expo-google-app-auth';
// import * as Facebook from 'expo-facebook';
// import notificationService from './NotificationService';
import { Platform } from 'react-native'
import config from 'config'
import { OS_TYPES } from '../../constants'
import ApiService from './ApiService'
import asyncStorageService from '../AsyncStorageService'
import { CredentialsLogin, User } from 'types/backend'

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

type UserCredentialsProp = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'id' | 'avatar'
>

type ForgotPasswordProp = Pick<User, 'email'>

type NewPasswordProp = {
  newPassword: string
}

type GoogleLoginCredentials = {
  type: string
  accessToken: string
}

type FacebookLoginCredentials = {
  type: string
  token: string
}

type RefreshTokenProp = {
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

  getUserInfoFromStorage = async (): Promise<any> => {
    return await asyncStorageService.getItem('user')
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

  createSession = async (user: UserCredentialsProp): Promise<void> => {
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
    credentials: CredentialsLogin
  ): Promise<UserCredentialsProp> => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, credentials)
    this.createSession(data)

    return data
  }

  googleLogin = async (
    loginPromise: Promise<GoogleLoginCredentials>
  ): Promise<UserCredentialsProp> => {
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
    loginPromise: Promise<FacebookLoginCredentials>
  ): Promise<UserCredentialsProp> => {
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

  forgotPassword = async ({ email }: ForgotPasswordProp): Promise<null> => {
    await this.apiClient.post(ENDPOINTS.FORGOT_PASSWORD, { email })

    return null
  }

  resetPassword = async (data: NewPasswordProp): Promise<null> => {
    await this.apiClient.post(ENDPOINTS.RESET_PASSWORD, data)
    return null
  }

  signup = async (
    signupData: CredentialsLogin
  ): Promise<UserCredentialsProp> => {
    await this.apiClient.post(ENDPOINTS.SIGN_UP, signupData)
    const { email, password } = signupData
    return this.login({ email, password })
  }

  getAccessToken = async (): Promise<string | undefined | null> => {
    const user = (await asyncStorageService.getItem('user')) as {
      accessToken: string
    } | null

    return user ? user.accessToken : undefined
  }

  getUser = async (): Promise<UserCredentialsProp> => {
    const user = (await asyncStorageService.getItem('user')) as string
    return JSON.parse(user)
  }

  updateUserInStorage = async (property: object): Promise<void> => {
    const user = (await asyncStorageService.getItem('user')) as string
    let jsonUser = JSON.parse(user)
    jsonUser = { ...jsonUser, ...property }
    asyncStorageService.setItem('user', JSON.stringify(jsonUser))
  }

  refreshToken = async (payload: RefreshTokenProp): Promise<null> => {
    const { data } = await this.apiClient.post(ENDPOINTS.REFRESH_TOKEN, payload)

    await this.createSession(data)

    return null
  }
}

const authService = new AuthService()

export default authService
