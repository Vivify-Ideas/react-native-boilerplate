import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import asyncStorageService from 'services/AsyncStorageService';
import userService from 'services/api/UserService';
import { UserI } from 'types';

export const useGetUser = (
  successCallback: () => void = () => {},
  errorCallback: () => void = () => {}
) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getToken = async (): Promise<void> => {
    const tokenAsync = await asyncStorageService.getItem('token');

    setToken(tokenAsync);
    setIsLoading(false);
  };

  useEffect(() => {
    getToken();
  }, []);

  const {
    data,
    refetch: queryRefetch,
    isLoading: isLoadingUser,
    ...restQueryProps
  } = useQuery<UserI, Error>('getUser', userService.me, {
    enabled: !!token,
    cacheTime: 0,
    onSuccess: successCallback,
    onError: errorCallback,
  });

  useEffect(() => {
    !!token && queryRefetch();
  }, [token]);

  const refetch = (): void => {
    getToken();
  };

  return {
    isLoading: isLoadingUser || isLoading,
    ...restQueryProps,
    data,
    refetch,
  };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UserI,
    Error,
    {
      avatar: { uri: string };
      firstName: string;
      lastName: string;
    }
  >(userService.edit, {
    onSuccess: (data: UserI) => {
      queryClient.setQueryData('getUser', data);
    },
  });
};

export const useUpdatePassword = () =>
  useMutation<void, Error, object>(userService.changePassword, {});
