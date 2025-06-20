import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import { Label } from '@/shared/ui/kit/label';
import { useAuthStore } from '@/shared/lib/store/auth.store';
import { profileApi, type CurrentUserProfileDto, type UpdateCurrentUserDto } from '@/shared/api/profile';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { isAuthenticated } = useAuthStore();
  const [profile, setProfile] = useState<CurrentUserProfileDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateCurrentUserDto>({
    Email: '',
    Phone: '',
    FirstName: '',
    LastName: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileApi.getCurrentUser();
        setProfile(response.data);
        const nameParts = response.data.Name.split(' ');
        setFormData({
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
  }, [isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await profileApi.updateCurrentUser(formData);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="FirstName">Имя</Label>
                <Input
                  id="FirstName"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleInputChange}
                  disabled={!isEditing || isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="LastName">Фамилия</Label>
                <Input
                  id="LastName"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleInputChange}
                  disabled={!isEditing || isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="Email">Email</Label>
              <Input
                id="Email"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Phone">Телефон</Label>
              <Input
                id="Phone"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
              />
            </div>

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
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                >
                  Редактировать
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export const Component = ProfilePage;
