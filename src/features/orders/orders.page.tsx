import { Card, CardContent } from '@/shared/ui/kit/card';
import { useOrders } from './model/use-order';
import OrdersCard from './ui/orders-card';

const OrdersPage = () => {
  const { orders, isLoading, error } = useOrders();

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

    return <OrdersCard orders={orders} />;
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
