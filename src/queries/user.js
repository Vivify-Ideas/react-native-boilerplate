import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import asyncStorageService from '../services/AsyncStorageService';
import userService from '../services/UserService';

export const useGetUser = (successCallback = () => {}, errorCallback = () => {}) => {
  const [token, setToken] = useState(null);
  const getToken = async () => {
    const tokenAsync = await asyncStorageService.getItem('token');

    setToken(tokenAsync);
  };

  useEffect(() => {
    getToken();
  }, []);

  const { data, refetch: queryRefetch, ...restQueryProps } = useQuery('getUser', userService.me, {
    enabled: !!token,
    cacheTime: 0,
    onSuccess: successCallback,
    onError: errorCallback
  });

  useEffect(
    () => {
      !!token && queryRefetch();
    },
    [token]
  );

  const refetch = () => {
    getToken();
  };

  return {
    ...restQueryProps,
    data,
    refetch
  };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(userService.edit, {
    onSuccess: data => {
      queryClient.setQueryData('getUser', data);
    }
  });
};

export const useUpdatePassword = () => useMutation(userService.changePassword, {});
