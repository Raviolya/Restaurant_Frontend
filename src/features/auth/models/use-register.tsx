import { authApi } from '@/shared/api/auth';
import { createCancelableRequest } from '@/shared/api/axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { ROUTES } from '@/shared/model/routes';

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

export function useRegister() {
  const navigate = useNavigate();
  const cancelRequestRef = useRef<(() => void) | null>(null);

  const registerMutation = useMutation<RegisterResponse, Error, RegisterCredentials>({
    mutationFn: async (credential: RegisterCredentials) => {
      if (cancelRequestRef.current) {
        cancelRequestRef.current();
      }

      const { signal, cancel } = createCancelableRequest();
      cancelRequestRef.current = cancel;

      try {
        return await authApi.register(credential, signal);
      } finally {
        cancelRequestRef.current = null;
      }
    },
    onSuccess: (data: RegisterResponse) => {
      if (data) {
        navigate(ROUTES.LOGIN);
      }
    },
    onError: (error: Error) => {
      if (error.name === 'CanceledError') {
        console.log('Registration request was canceled');
        return;
      }
      console.error('Registration error:', error.message);
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
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
  };
}
