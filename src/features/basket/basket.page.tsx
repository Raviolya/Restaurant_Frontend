import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Button } from '@/shared/ui/kit/button';
import { Textarea } from '@/shared/ui/kit/textarea';
import { ROUTES } from '@/shared/model/routes';
import { useBasket } from './use-basket';
import BasketItemCard from './basket-item-card';

const BasketPage = () => {
  const {
    items,
    comment,
    setComment,
    isLoading,
    totalAmount,
    handleCreateOrder,
    handleRemoveItem,
  } = useBasket();

  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
            <Button onClick={() => navigate(ROUTES.POSITIONS)}>Перейти к меню</Button>
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
            <BasketItemCard
              key={`${item.Id}-${JSON.stringify(item.Ingredients)}`}
              item={item}
              onRemove={handleRemoveItem}
            />
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
                  <label className="block text-sm font-medium mb-2">Комментарий к заказу</label>
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
                  <Button className="w-full" onClick={handleCreateOrder} disabled={isLoading}>
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
