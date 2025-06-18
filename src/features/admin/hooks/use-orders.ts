import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/shared/api/orders';

export const useOrders = () => {
  const { data: allOrders, isLoading: isLoadingAll } = useQuery({
    queryKey: ['orders', 'all'],
    queryFn: ordersApi.getAllOrders,
  });

  const { data: pendingOrders, isLoading: isLoadingPending } = useQuery({
    queryKey: ['orders', 'pending'],
    queryFn: ordersApi.getPendingOrders,
  });

  return {
    allOrders,
    pendingOrders,
    isLoading: isLoadingAll || isLoadingPending,
  };
};
