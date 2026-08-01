import { useMutation } from '@tanstack/react-query';
import { authService, LoginPayload, RegisterPayload, AuthResponse } from '@/services/authService';

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (data) => authService.login(data),
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (data) => authService.register(data),
  });
};
