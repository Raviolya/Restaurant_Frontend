import { authApi } from '../api/auth';
import { useAuthStore } from '../lib/store/auth.store';
import { AxiosError } from 'axios';

interface ValidationError {
  [key: string]: string[];
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

interface RegisterResponse {
  Id: string;
  Email: string;
  Name: string;
  Role: string;
}

export class AuthService {
  static async login(email: string, password: string) {
    try {
      const response = (await authApi.login({ email, password })) as LoginResponse;
      const userData = {
        id: response.User.Id,
        email: response.User.Email,
        name: response.User.Name,
        role: response.User.Role,
      };

      useAuthStore.getState().setUser(userData);
      return userData;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.title ||
          Object.values(error.response?.data?.errors || {})
            .flat()
            .join(', ') ||
          'Ошибка при входе/регистрации';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  static async register(credentials: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: Date;
  }) {
    try {
      const response = await authApi.register({
        FirstName: credentials.firstName,
        LastName: credentials.lastName,
        Email: credentials.email,
        Phone: credentials.phone,
        Password: credentials.password,
        ConfirmPassword: credentials.confirmPassword,
        DateOfBirth: credentials.dateOfBirth,
      });

      const userData = {
        id: response.Id,
        email: response.Email,
        name: response.Name,
        role: response.Role,
      };

      useAuthStore.getState().setUser(userData);
      return userData;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.title ||
          Object.values(error.response?.data?.errors || {})
            .flat()
            .join(', ') ||
          'Ошибка при входе/регистрации';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  static async logout() {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      useAuthStore.getState().setUser(null);
    }
  }

  static async refreshToken() {
    try {
      return await authApi.refreshToken();
    } catch (error) {
      useAuthStore.getState().setUser(null);
      throw error;
    }
  }

  static initialize() {
    const state = useAuthStore.getState();
    if (!state.user) {
      state.setUser(null);
    }
  }
}
