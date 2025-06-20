import { type MenuItemDto } from '@/shared/api/menu';
import { cn } from '@/shared/lib/css';

export const MenuItemCard = ({
  item,
  selected,
  onSelect,
}: {
  item: MenuItemDto;
  selected: boolean;
  onSelect: () => void;
}) => (
  <div
    className={cn(
      'border rounded-lg p-3 sm:p-4 cursor-pointer transition hover:shadow-md',
      selected ? 'border-primary bg-primary/10' : 'border-gray-200'
    )}
    onClick={onSelect}
  >
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <div className="flex-1">
        <div className="font-bold text-base sm:text-lg">{item.Name}</div>
        <div className="text-xs sm:text-sm text-muted-foreground">{item.CategoryName}</div>
      </div>
      <div className="font-bold text-base sm:text-lg whitespace-nowrap">{item.Price} ₽</div>
    </div>
    {item.Description && (
      <div className="mt-2 text-xs sm:text-sm line-clamp-2">{item.Description}</div>
    )}
    <div className="mt-2 text-xs text-muted-foreground">
      {item.IsAvailable ? 'В наличии' : 'Нет в наличии'}
    </div>
  </div>
);
