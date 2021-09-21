import { User } from './backend'

export interface CredentialsLogin {
  email: string
  password: string
}

export type UserProfileInformationProps = Pick<
  User,
  'first_name' | 'last_name' | 'email' | 'id' | 'avatar'
>

export type ForgotPasswordProp = Pick<User, 'email'>

export interface PasswordRecoveryProps {
  password: string
  confirmation_password: string
  token: string
}

export interface GoogleLoginCredentials {
  type: string
  accessToken: string
}

export interface FacebookLoginCredentials {
  type: string
  token: string
}

export interface RefreshTokenProp {
  JwtToken: string
  JwtRefreshToken: string
}

export interface ChangePasswordProps {
  current_password: string
  new_password: string
  new_password_confirmation: string
}

export interface AuthenticationTokensProps {
  access: string
  refresh: string
}
