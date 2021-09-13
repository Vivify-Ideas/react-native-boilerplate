import { User } from './backend'

export type CredentialsLogin = {
  email: string
  password: string
}

export type UserCredentialsProp = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'id' | 'avatar'
>

export type ForgotPasswordProp = Pick<User, 'email'>

export type PasswordRecoveryProps = {
  password: string
  confirmation_password: string
  token: string
}

export type GoogleLoginCredentials = {
  type: string
  accessToken: string
}

export type FacebookLoginCredentials = {
  type: string
  token: string
}

export type RefreshTokenProp = {
  JwtToken: string
  JwtRefreshToken: string
}

export interface ChangePasswordProps {
  current_password: string
  new_password: string
  new_password_confirmation: string
}
