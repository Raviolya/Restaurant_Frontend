import { Button } from '@/shared/ui/kit/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { PhoneInput } from '@/shared/ui/kit/phone-input';
import { Calendar } from '@/shared/ui/kit/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/kit/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/shared/lib/css';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '../models/use-register';
import { useRef, useEffect } from 'react';

const registerSchema = z
  .object({
    FirstName: z
      .string({ required_error: 'Имя обязателен' })
      .min(2, 'Имя должно быть от 2 до 50 символов')
      .max(50, 'Имя должно быть от 2 до 50 символов'),

    LastName: z
      .string({ required_error: 'Фамилия обязателен' })
      .min(2, 'Фамилия должна быть от 2 до 50 символов')
      .max(50, 'Фамилия должна быть от 2 до 50 символов'),

    Phone: z
      .string({ required_error: 'Номер обязателен' })
      .refine((value) => isValidPhoneNumber(value), {
        message: 'Неверный номер телефона',
      }),

    DateOfBirth: z
      .date({
        required_error: 'Дата рождения обязательна',
        invalid_type_error: 'Введите корректную дату рождения',
      })
      .refine(
        (date) => {
          const currentDate = new Date();
          currentDate.setFullYear(currentDate.getFullYear() - 10);
          return currentDate >= date;
        },
        {
          message: 'Вы должны быть старше 10 лет',
        }
      ),

    Email: z
      .string({ required_error: 'Email обязателен' })
      .email('Неверный email')
      .max(100, 'Email слишком длинный'),

    Password: z
      .string({ required_error: 'Пароль обязателен' })
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .max(100, 'Пароль слишком длинный')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
      .regex(/[^A-Za-z0-9]/, 'Пароль должен содержать хотя бы один специальный символ'),

    ConfirmPassword: z.string({ required_error: 'Подтвердите пароль' }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    path: ['ConfirmPassword'],
    message: 'Пароли не совпадают',
  });

const RegisterForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { register, isLoading, error } = useRegister();

  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    if (isLoading) {
      return;
    }
    console.table(data);
    register(data);
  });

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
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="FirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Введите ваше имя" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="LastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder="Введите вашу фамилию" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Email"
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
            name="Phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left">Номер телефона</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="Введите номер телефона"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription className="text-left">Введите ваш номер телефона</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Введите пароль"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Пароль должен содержать:
                  <ul className="list-disc list-inside mt-1 text-sm">
                    <li>Минимум 8 символов</li>
                    <li>Заглавную букву</li>
                    <li>Строчную букву</li>
                    <li>Цифру</li>
                    <li>Специальный символ</li>
                  </ul>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ConfirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Повторите пароль"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="DateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата рождения</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                        disabled={isLoading}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Выберите дату</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01') || isLoading
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
              {error instanceof Error ? error.message : 'Произошла ошибка при регистрации'}
            </div>
          )}

          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
