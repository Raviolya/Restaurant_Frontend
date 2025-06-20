import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/shared/api/auth';
import { ROUTES } from '@/shared/model/routes';
import { useEffect, useRef } from 'react';
import { createCancelableRequest } from '@/shared/api/axios';
import { AxiosError } from 'axios';

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

interface LoginCredentials {
  email: string;
  password: string;
}

interface ValidationError {
  [key: string]: string[];
}

export function useLogin() {
  const navigate = useNavigate();
  const cancelRequestRef = useRef<(() => void) | null>(null);

  const loginMutation = useMutation<LoginResponse, AxiosError<ValidationError>, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      if (cancelRequestRef.current) {
        cancelRequestRef.current();
      }
      const { signal, cancel } = createCancelableRequest();
      cancelRequestRef.current = cancel;

      try {
        return await authApi.login(credentials, signal);
      } finally {
        cancelRequestRef.current = null;
      }
    },
    onSuccess: (data: LoginResponse) => {
      if (data && data.User) {
        const userData = {
          id: data.User.Id,
          email: data.User.Email,
          name: data.User.Name,
          role: data.User.Role,
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }

      navigate(ROUTES.POSITIONS);
    },
    onError: (error: AxiosError<ValidationError>) => {
      if (error.name === 'CanceledError') {
        console.log('Login request was canceled');
        return;
      }

      localStorage.removeItem('user');
      console.error('Login error:', error.message);
    },
  });

  useEffect(() => {
    return () => {
      if (cancelRequestRef.current) {
        cancelRequestRef.current();
      }
    };
  }, []);

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}
