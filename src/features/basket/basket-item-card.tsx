import { Card, CardContent } from '@/shared/ui/kit/card';
import { Button } from '@/shared/ui/kit/button';
import { Badge } from '@/shared/ui/kit/badge';

interface BasketItemCardProps {
  item: any;
  onRemove: (itemId: string, ingredients: string[]) => void;
}

const BasketItemCard = ({ item, onRemove }: BasketItemCardProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{item.Name}</h3>
            <p className="text-gray-600">Количество: {item.quantity}</p>
            <div className="mt-2">
              {item.Ingredients.map((ingredient: string) => (
                <Badge key={ingredient} variant="secondary" className="mr-2">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{item.Price * item.quantity} ₽</p>
            <Button
              variant="destructive"
              size="sm"
              className="mt-2"
              onClick={() => onRemove(item.Id, item.Ingredients)}
            >
              Удалить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasketItemCard;
