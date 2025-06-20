import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Button } from '@/shared/ui/kit/button';
import { Textarea } from '@/shared/ui/kit/textarea';
import { Badge } from '@/shared/ui/kit/badge';
import { useBasketStore } from '@/shared/lib/store/basket.store';
import { ordersApi } from '@/shared/api/orders';
import { useAuthStore } from '@/shared/lib/store/auth.store';
import { ROUTES } from '@/shared/model/routes';
import { toast } from 'sonner';

const BasketPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, clear } = useBasketStore();
  const { isAuthenticated } = useAuthStore();
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = items.reduce((sum, item) => sum + item.Price * item.quantity, 0);

  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      toast.error('Необходима авторизация для оформления заказа');
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      setIsLoading(true);
      const orderItems = items.map(item => ({
        MenuItemId: item.Id,
        Quantity: item.quantity,
        ExcludedIngredients: item.Ingredients.filter(ing => !item.Ingredients.includes(ing))
      }));

      const response = await ordersApi.createOrder({
        Items: orderItems
      });

      if (response.status === 201) {
        clear();
        toast.success('Заказ успешно оформлен!');
        navigate(ROUTES.POSITIONS);
      }
    } catch (error) {
      toast.error('Ошибка при создании заказа');
      console.error('Ошибка при создании заказа:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (itemId: string, ingredients: string[]) => {
    removeItem(itemId, ingredients);
    toast.success('Товар удален из корзины');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
            <Button onClick={() => navigate(ROUTES.POSITIONS)}>
              Перейти к меню
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-black">Корзина</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <Card key={`${item.Id}-${JSON.stringify(item.Ingredients)}`} className="mb-4">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{item.Name}</h3>
                    <p className="text-gray-600">Количество: {item.quantity}</p>
                    <div className="mt-2">
                      {item.Ingredients.map((ingredient) => (
                        <Badge key={ingredient} variant="secondary" className="mr-2">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{item.Price * item.quantity} ₽</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => handleRemoveItem(item.Id, item.Ingredients)}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Оформление заказа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Комментарий к заказу
                  </label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Например: без лука, острое"
                  />
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Итого:</span>
                    <span>{totalAmount} ₽</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleCreateOrder}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Оформление...' : 'Оформить заказ'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Component = BasketPage;
