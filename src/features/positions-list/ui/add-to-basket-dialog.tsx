import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/ui/kit/dialog';
import { Button } from '@/shared/ui/kit/button';
import { Checkbox } from '@/shared/ui/kit/checkbox';
import type { MenuItemDto } from '@/shared/api/menu';
import { useBasketStore } from '@/shared/lib/store/basket.store';
import { toast } from 'sonner';

interface AddToBasketDialogProps {
  item: MenuItemDto;
  isOpen: boolean;
  onClose: () => void;
}

export const AddToBasketDialog = ({ item, isOpen, onClose }: AddToBasketDialogProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(item.Ingredients || []);
  const addItem = useBasketStore((state) => state.addItem);

  const handleToggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((i) => i !== ingredient) : [...prev, ingredient]
    );
  };

  const handleAddToBasket = () => {
    addItem({
      Id: item.Id,
      Name: item.Name,
      Price: item.Price,
      ImageUrl: item.ImageUrl,
      Ingredients: selectedIngredients,
    });
    toast.success(`${item.Name} добавлен в корзину`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item.Name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{item.Description}</p>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">Ингредиенты:</h3>
            {item.Ingredients?.map((ingredient) => (
              <div key={ingredient} className="flex items-center space-x-2">
                <Checkbox
                  id={ingredient}
                  checked={selectedIngredients.includes(ingredient)}
                  onCheckedChange={() => handleToggleIngredient(ingredient)}
                />
                <label htmlFor={ingredient}>{ingredient}</label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddToBasket}>Добавить в корзину</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
