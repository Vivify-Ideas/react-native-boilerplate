import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import SCREENS from 'constants/screens'
import { UserContext } from 'contexts/UserContext'
import authService from 'services/api/AuthService'
import NavigationService from 'services/NavigationService'
import {
  CredentialsLogin,
  ForgotPasswordProp,
  PasswordRecoveryProps
} from 'types/auth'

export const useLoginMutation = () => {
  const { refetch } = useContext(UserContext)

  return useMutation<object, Error, CredentialsLogin>(authService.login, {
    retry: false,
    onSuccess: async () => {
      refetch()
    }
  })
}

export const useRegisterMutation = () => {
  return useMutation<object, Error, CredentialsLogin>(authService.signup, {
    onSuccess: () => NavigationService.navigate(SCREENS.AUTH_STACK.INDEX)
  })
}

export const useForgotPasswordMutation = () => {
  return useMutation<null, Error, ForgotPasswordProp>(
    authService.forgotPassword
  )
}

export const useResetPasswordMutation = () => {
  return useMutation<null, Error, PasswordRecoveryProps>(
    authService.resetPassword,
    {
      onSuccess: () => {
        setTimeout(
          () => NavigationService.navigate(SCREENS.AUTH_STACK.INDEX),
          5000
        )
      }
    }
  )
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<null, Error, void>(authService.logout, {
    onSuccess: () => {
      queryClient.setQueryData('getUser', null)
    },
    onError: () => {
      queryClient.setQueryData('getUser', null)
    }
  })
}

export const useRefreshTokenMutation = (
  successCallback: () => void = () => {},
  errorCallback: () => void = () => {}
) => {
  const { refetch } = useContext(UserContext)

  return useMutation<
    null,
    Error,
    {
      JwtToken: string
      JwtRefreshToken: string
    }
  >(authService.refreshToken, {
    onSuccess: () => {
      refetch()
      successCallback()
    },
    onError: errorCallback
  })
}
