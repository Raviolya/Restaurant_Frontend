import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/shared/ui/kit/form';
import { useAuthStore } from '@/shared/lib/store/auth.store';
import {
  profileApi,
  type CurrentUserProfileDto,
  type UpdateCurrentUserDto,
} from '@/shared/api/profile';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
  FirstName: z.string().min(1, 'Имя обязательно'),
  LastName: z.string().min(1, 'Фамилия обязательна'),
  Email: z.string().email('Неверный формат email'),
  Phone: z.string().min(10, 'Телефон должен содержать минимум 10 цифр'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { isAuthenticated } = useAuthStore();
  const [profile, setProfile] = useState<CurrentUserProfileDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileApi.getCurrentUser();
        setProfile(response.data);
        const nameParts = response.data.Name.split(' ');
        form.reset({
          Email: response.data.Email,
          Phone: response.data.Phone,
          FirstName: nameParts[0] || '',
          LastName: nameParts.slice(1).join(' ') || '',
        });
      } catch (err) {
        setError('Не удалось загрузить профиль');
        console.error('Ошибка при загрузке профиля:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, form]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      const response = await profileApi.updateCurrentUser(data);
      setProfile(response.data);
      setIsEditing(false);
      toast.success('Профиль успешно обновлен');
    } catch (err) {
      toast.error('Не удалось обновить профиль');
      console.error('Ошибка при обновлении профиля:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-black">Профиль</h1>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p>Пожалуйста, войдите в систему для просмотра профиля</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading && !profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-black">Профиль</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-black">Профиль</h1>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-black">Профиль</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о пользователе</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="FirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing || isLoading} />
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
                        <Input {...field} disabled={!isEditing || isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={!isEditing || isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing || isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                    >
                      Отмена
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)} disabled={isLoading}>
                    Редактировать
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export const Component = ProfilePage;
