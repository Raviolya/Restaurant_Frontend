import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/kit/card';
import { Badge } from '@/shared/ui/kit/badge';
import { OrderStatus } from '@/shared/constat/constant';
import { type OrderResponseDto, type OrderItemResponse } from '@/shared/api/orders';

interface OrderCardProps {
  order: OrderResponseDto;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Card>
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
  );
};

export default OrderCard;
