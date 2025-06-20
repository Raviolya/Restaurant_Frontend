import type { FC } from 'react';
import { ROUTES } from '@/shared/model/routes';
import AuthLayout from './ui/authLayout';
import LoginForm from './ui/login-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/lib/store/auth.store';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.POSITIONS);
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthLayout
      title="Вход в аккаунт"
      description="Введите свой адрес электронной почты ниже, чтобы войти в свою учетную запись"
      form={<LoginForm />}
      footer={<></>}
      link={ROUTES.REGISTER}
      textLink="Sign up"
    />
  );
};

export const Component = LoginPage;
