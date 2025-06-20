import type { FC } from 'react';
import { ROUTES } from '@/shared/model/routes';
import AuthLayout from './authLayout';
import LoginForm from './login-form';

const LoginPage: FC = () => {
  return (
    <>
      <AuthLayout
        title="Вход в аккаунт"
        description="Введите свой адрес электронной почты ниже, чтобы войти в свою учетную запись"
        form={<LoginForm />}
        footer={<></>}
        link={ROUTES.REGISTER}
        textLink="Sign up"
      ></AuthLayout>
    </>
  );
};

export const Component = LoginPage;
