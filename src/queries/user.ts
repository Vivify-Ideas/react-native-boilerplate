import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import userService from 'services/api/UserService'
import asyncStorageService from 'services/AsyncStorageService'
import { ChangePasswordProps } from 'types/auth'
import { User } from 'types/backend'

export const useGetUserQuery = (
  successCallback: () => void = () => {},
  errorCallback: () => void = () => {}
) => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getToken = async (): Promise<void> => {
    const token = (await asyncStorageService.getItem('token')) as string
    setToken(token)
    setIsLoading(false)
  }

  useEffect(() => {
    getToken()
  }, [])

  const {
    data,
    refetch: queryRefetch,
    isLoading: isLoadingUser,
    ...restQueryProps
  } = useQuery<User, Error>('getUser', userService.me, {
    enabled: !!token,
    cacheTime: 0,
    onSuccess: successCallback,
    onError: errorCallback
  })

  useEffect(() => {
    !!token && queryRefetch()
  }, [token])

  const refetch = (): void => {
    getToken()
  }

  return {
    isLoading: isLoadingUser || isLoading,
    ...restQueryProps,
    data,
    refetch
  }
}

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    User,
    Error,
    {
      id: string
      avatar?: { uri: string }
      first_name: string
      last_name: string
    }
  >(userService.edit, {
    onSuccess: (data: User) => {
      queryClient.setQueryData('getUser', data)
    }
  })
}

export const useUpdatePasswordMutation = () =>
  useMutation<void, Error, ChangePasswordProps>(userService.changePassword, {})
