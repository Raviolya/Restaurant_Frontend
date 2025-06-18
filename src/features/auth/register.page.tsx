import type { FC } from 'react';
import { ROUTES } from '@/shared/model/routes';
import AuthLayout from './ui/authLayout';
import RegisterForm from './ui/register-form';

const RegisterPage: FC = () => {
  return (
    <>
      <div className="mb-10">
        <AuthLayout
          title="Регистрация"
          description="Введите свои данные для создания учетной записи"
          form={<RegisterForm />}
          footer={<></>}
          link={ROUTES.LOGIN}
          textLink="Sign in"
        />
      </div>
    </>
  );
};

export const Component = RegisterPage;
