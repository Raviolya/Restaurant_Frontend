import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Badge } from '@/shared/ui/kit/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select';
import { type OrderResponseDto, type OrderItemResponse } from '@/shared/api/orders';
import { useUpdateOrderStatus } from '../hooks/use-update-order-status';

interface OrdersListProps {
  orders: OrderResponseDto[];
  isLoading: boolean;
}

export const OrdersList = ({ orders, isLoading }: OrdersListProps) => {
  const { mutate: updateStatus } = useUpdateOrderStatus();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.Id} className="mb-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Заказ #{order.Id.slice(0, 8)}</CardTitle>
              <Badge variant={order.Status === 'Pending' ? 'default' : 'secondary'}>
                {order.Status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Пользователь:</strong> {order.UserName}
              </p>
              <p>
                <strong>Сумма:</strong> {order.TotalPrice} ₽
              </p>
              <p>
                <strong>Дата:</strong> {new Date(order.CreatedAt).toLocaleString()}
              </p>
              <div className="mt-4">
                <p className="font-semibold mb-2">Позиции заказа:</p>
                <ul className="space-y-1">
                  {order.OrderItems.map((item: OrderItemResponse) => (
                    <li key={item.Id}>
                      {item.MenuItemName} x {item.Quantity} - {item.Price * item.Quantity} ₽
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Select
                  onValueChange={(value) => updateStatus({ orderId: order.Id, newStatus: value })}
                  defaultValue={order.Status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Изменить статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Ожидает</SelectItem>
                    <SelectItem value="Preparing">Готовится</SelectItem>
                    <SelectItem value="Completed">Завершен</SelectItem>
                    <SelectItem value="Cancelled">Отменен</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
