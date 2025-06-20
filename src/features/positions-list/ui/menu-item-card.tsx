import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/shared/ui/kit/card';
import { Badge } from '@/shared/ui/kit/badge';
import { Button } from '@/shared/ui/kit/button';
import type { MenuItemDto } from '@/shared/api/menu';
import { AddToBasketDialog } from './add-to-basket-dialog';

interface MenuItemCardProps {
  item: MenuItemDto;
}

export const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        {item.ImageUrl && (
          <div className="relative h-48">
            <img src={item.ImageUrl} alt={item.Name} className="w-full h-full object-cover" />
          </div>
        )}
        <CardHeader>
          <CardTitle>{item.Name}</CardTitle>
          <CardDescription>{item.Description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-blue-600">{item.Price} ₽</span>
            <Badge variant="secondary">{item.CategoryName}</Badge>
          </div>
          {item.Ingredients && item.Ingredients.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">Ингредиенты:</h3>
              <div className="flex flex-wrap gap-2">
                {item.Ingredients.map((ingredient) => (
                  <Badge key={`${item.Id}-${ingredient}`} variant="outline">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!item.IsAvailable && <Badge variant="destructive">Нет в наличии</Badge>}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsDialogOpen(true);
            }}
          >
            Добавить
          </Button>
        </CardFooter>
      </Card>
      <AddToBasketDialog item={item} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
};
