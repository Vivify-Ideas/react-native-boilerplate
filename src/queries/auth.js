import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import SCREENS from '../constants/screens';
import { UserContext } from '../contexts/UserContext';
import asyncStorageService from '../services/AsyncStorageService';
import authService from '../services/AuthService';
import NavigationService from '../services/NavigationService';

export const useLogin = () => {
  const { refetch } = useContext(UserContext);

  return useMutation(authService.login, {
    onSuccess: async data => {
      await asyncStorageService.setItem('token', data);
      refetch();
    }
  });
};

export const useRegister = () => {
  return useMutation(authService.signup, {
    onSuccess: () => NavigationService.navigate(SCREENS.AUTH_STACK.INDEX)
  });
};

export const useForgotPassword = () => useMutation(authService.forgotPassword, {});

export const useResetPassword = () => {
  return useMutation(authService.resetPassword, {
    onSuccess: () => setTimeout(() => NavigationService.navigate(SCREENS.AUTH_STACK.INDEX), 5000)
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(authService.logout, {
    onSuccess: () => {
      queryClient.setQueryData('getUser', null);
    }
  });
};
