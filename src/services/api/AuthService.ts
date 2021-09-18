import { Platform } from 'react-native'
import {
  CredentialsLogin,
  FacebookLoginCredentials,
  ForgotPasswordProp,
  GoogleLoginCredentials,
  PasswordRecoveryProps,
  RefreshTokenProp,
  UserCredentialsProp
} from 'types/auth'
import { User } from 'types/backend'
import { OS_TYPES } from '../../constants'
import asyncStorageService from '../AsyncStorageService'
import config from './../../config'
import ApiService from './ApiService'
import ENDPOINTS from '../../constants/endpoints'

const {
  ANDROID_GOOGLE_CLIENT_ID,
  IOS_GOOGLE_CLIENT_ID,
  FACEBOOK_APP_ID,
  CLIENT_ID
} = config

class AuthService extends ApiService {
  constructor() {
    super()
    this.init()
  }

  init = async (): Promise<void> => {
    const token = await this.getAccessToken()
    const user = await this.getUserFromAsyncStorage()

    if (token && user) {
      await this.setAuthorizationHeader()
      this.api.setUnauthorizedCallback(this.destroySession.bind(this))
    }
  }

  getUserFromAsyncStorage = async () => {
    return (await asyncStorageService.getItem('user')) as User | null
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
    if (!credentials['username']) {
      // the login page doesnt have the username input field
      credentials['username'] = credentials['email'] // in this case the BE is expecting the username to be the email
    }

    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, credentials)
    await asyncStorageService.setItem('token', data['access'])
    await this.setAuthorizationHeader()

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
    try {
      // await this.apiClient.post(ENDPOINTS.LOGOUT) // there is no route for logout atm
      await this.destroySession()
    } catch (error) {
      console.log('Destroying session error: ', error)
    }
    return null
  }

  forgotPassword = async ({ email }: ForgotPasswordProp): Promise<null> => {
    await this.apiClient.post(ENDPOINTS.FORGOT_PASSWORD, { email })

    return null
  }

  resetPassword = async (data: PasswordRecoveryProps): Promise<null> => {
    await this.apiClient.post(ENDPOINTS.RESET_PASSWORD, data)
    return null
  }

  signup = async (
    signupData: CredentialsLogin
  ): Promise<UserCredentialsProp> => {
    signupData['username'] = signupData['email'] // the username is the same as the email -
    await this.apiClient.post(ENDPOINTS.SIGN_UP, signupData)
    const { email, password, username } = signupData

    return this.login({ email, password, username })
  }

  getAccessToken = async (): Promise<string | undefined> => {
    return (await asyncStorageService.getItem('token')) as string
  }

  updateUserInStorage = async (data: Partial<User>): Promise<void> => {
    const user = (await this.getUserFromAsyncStorage()) || {}
    asyncStorageService.setItem('user', JSON.stringify({ ...user, ...data }))
  }

  refreshToken = async (payload: RefreshTokenProp): Promise<null> => {
    const { data } = await this.apiClient.post(ENDPOINTS.REFRESH_TOKEN, payload)

    await this.createSession(data)

    return null
  }
}

const authService = new AuthService()

export default authService
