import { Button } from '@/shared/ui/kit/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import type { FC } from 'react';
import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../models/use-login';

const loginSchema = z.object({
  email: z.string({ required_error: 'Email обязателен' }).email('Неверный email'),
  password: z
    .string({ required_error: 'Пароль обязателен' })
    .min(8, 'Пароль должен содержать 8 символов'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: FC = () => {
  const { login, isLoading, error } = useLogin();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    if (isLoading) {
      return;
    }
    login(data);
  };

  useEffect(() => {
    return () => {
      if (formRef.current) {
        formRef.current.reset();
      }
    };
  }, []);

  return (
    <>
      <Form {...form}>
        <form ref={formRef} className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
              {error instanceof Error ? error.message : 'Произошла ошибка при входе'}
            </div>
          )}
          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
