import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Badge } from '@/shared/ui/kit/badge';
import { ordersApi, type OrderResponseDto, type OrderItemResponse } from '@/shared/api/orders';
import { OrderStatus, type OrderStatusType } from '@/shared/constat/constant';

const OrdersPage = () => {
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      );
    }

    if (orders.length === 0) {
      return (
        <Card>
          <CardContent className="p-6 text-center">
            <p>У вас пока нет заказов</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.Id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Заказ #{order.Id.slice(0, 8)}</CardTitle>
                <Badge
                  variant={
                    order.Status === OrderStatus.COMPLETED
                      ? 'default'
                      : order.Status === OrderStatus.CANCELLED
                        ? 'destructive'
                        : 'secondary'
                  }
                >
                  {order.Status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Создан: {new Date(order.CreatedAt).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  {order.OrderItems.map((item: OrderItemResponse) => (
                    <div
                      key={item.Id}
                      className="flex justify-between items-center py-2 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{item.MenuItemName}</p>
                        <p className="text-sm text-gray-500">Количество: {item.Quantity}</p>
                        {item.ExcludedIngredients.length > 0 && (
                          <div className="mt-1">
                            {item.ExcludedIngredients.map((ingredient: string) => (
                              <Badge key={ingredient} variant="outline" className="mr-1 text-xs">
                                Без {ingredient}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="font-medium">{item.Price * item.Quantity} ₽</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-bold">Итого:</span>
                  <span className="font-bold text-xl">{order.TotalPrice} ₽</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-black">История заказов</h1>
      </div>
      {renderContent()}
    </div>
  );
};

export const Component = OrdersPage;
