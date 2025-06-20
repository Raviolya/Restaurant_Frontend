import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasketStore } from '@/shared/lib/store/basket.store';
import { ordersApi } from '@/shared/api/orders';
import { useAuthStore } from '@/shared/lib/store/auth.store';
import { ROUTES } from '@/shared/model/routes';
import { toast } from 'sonner';

export const useBasket = () => {
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
      const orderItems = items.map((item) => ({
        MenuItemId: item.Id,
        Quantity: item.quantity,
        ExcludedIngredients: item.Ingredients.filter((ing) => !item.Ingredients.includes(ing)),
      }));

      const response = await ordersApi.createOrder({
        Items: orderItems,
      });

      if (response.status === 201) {
        clear();
        toast.success('Заказ успешно оформлен!');
        navigate(ROUTES.ORDERS);
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

  return {
    items,
    removeItem,
    clear,
    comment,
    setComment,
    isLoading,
    setIsLoading,
    totalAmount,
    handleCreateOrder,
    handleRemoveItem,
  };
};
