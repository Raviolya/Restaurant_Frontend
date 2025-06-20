import { axiosInstance, createCancelableRequest } from './axios';
import { AxiosError } from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  Token: string;
  RefreshToken: string;
  Expiration: string;
  User: {
    Id: string;
    Email: string;
    Name: string;
    Role: string;
  };
}

interface RegisterCredentials {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Password: string;
  ConfirmPassword: string;
  DateOfBirth: Date;
}

interface RegisterResponse {
  Id: string;
  Email: string;
  Name: string;
  Role: string;
}

interface ValidationError {
  [key: string]: string[];
}

interface ApiError {
  type: string;
  title: string;
  status: number;
  errors: ValidationError;
  traceId: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials, signal?: AbortSignal): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post(
      '/api/Auth/login',
      {
        Email: credentials.email,
        Password: credentials.password,
      },
      { signal }
    );

    if (!data || !data.Token || !data.RefreshToken || !data.Expiration || !data.User) {
      throw new Error('Invalid server response format');
    }

    if (!data.User.Id || !data.User.Email || !data.User.Name || !data.User.Role) {
      throw new Error('Invalid user data format');
    }

    return data;
  },

  register: async (
    credentials: RegisterCredentials,
    signal?: AbortSignal
  ): Promise<RegisterResponse> => {
    const { data } = await axiosInstance.post('/api/Auth/register', credentials, { signal });
    return data;
  },

  logout: async (signal?: AbortSignal): Promise<void> => {
    await axiosInstance.post('/api/Auth/logout', {}, { signal });
    localStorage.removeItem('user');
  },

  refreshToken: async (signal?: AbortSignal): Promise<void> => {
    try {
      await axiosInstance.post('/api/Auth/refresh', {}, { signal });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      throw error;
    }
  },
};
