import { useEffect, useState } from 'react';
import { ordersApi, type OrderResponseDto } from '@/shared/api/orders';
import { OrderStatus, type OrderStatusType } from '@/shared/constat/constant';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersApi.getMyOrders();
        const sortedOrders = response.data.sort((a, b) => {
          const statusOrder: Record<OrderStatusType, number> = {
            [OrderStatus.PENDING]: 0,
            [OrderStatus.PREPARING]: 1,
            [OrderStatus.COMPLETED]: 2,
            [OrderStatus.CANCELLED]: 3,
          };

          const statusDiff =
            statusOrder[a.Status as OrderStatusType] - statusOrder[b.Status as OrderStatusType];
          if (statusDiff !== 0) return statusDiff;

          return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime();
        });

        setOrders(sortedOrders);
      } catch (err) {
        setError('Не удалось загрузить историю заказов');
        console.error('Ошибка при загрузке заказов:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, setOrders, isLoading, setIsLoading, error, setError };
};
