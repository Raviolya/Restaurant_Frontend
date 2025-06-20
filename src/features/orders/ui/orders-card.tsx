import { type OrderResponseDto } from '@/shared/api/orders';
import OrderCard from './order-card';

interface OrdersCardProps {
  orders: OrderResponseDto[];
}

function OrdersCard({ orders }: OrdersCardProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.Id} order={order} />
      ))}
    </div>
  );
}

export default OrdersCard;
