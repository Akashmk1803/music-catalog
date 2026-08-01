import axiosInstance from '@/utils/axios';

export interface LoginPayload {
  email: string;
  password?: string;
  securityKey?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  securityKey?: string;
}

export interface AuthResponse {
  token: string;
  // backend may return user details, we ignore them for V1 as per requirements
}

export const authService = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    // Map securityKey to password if needed depending on backend
    const payload = {
      email: data.email,
      password: data.securityKey || data.password,
    };
    const response = await axiosInstance.post<AuthResponse>('/api/auth/login', payload);
    return response.data;
  },

  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.securityKey || data.password,
    };
    const response = await axiosInstance.post<AuthResponse>('/api/auth/register', payload);
    return response.data;
  },
};
