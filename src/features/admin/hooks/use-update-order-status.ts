import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/shared/api/orders';
import { toast } from 'sonner';

interface UpdateOrderStatusParams {
  orderId: string;
  newStatus: string;
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, newStatus }: UpdateOrderStatusParams) =>
      ordersApi.updateOrderStatus(orderId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Статус заказа успешно обновлен');
    },
    onError: (error) => {
      toast.error('Ошибка при обновлении статуса заказа');
      console.error('Ошибка при обновлении статуса заказа:', error);
    },
  });
};
