import { useState } from 'react';
import { MenuItemCard } from './menu-item-card';
import { MenuItemFormDialog } from './menu-item-form-dialog';
import { useMenuItems } from '../hooks/use-menu-items';
import { useCategories } from '@/shared/hooks/use-categories';
import { Button } from '@/shared/ui/kit/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select';

export const MenuManagementPage = () => {
  const {
    menuItems,
    isLoading: menuLoading,
    error: menuError,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refetch: refetchMenu,
  } = useMenuItems();

  const { categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const selectedItem = menuItems.find((item) => item.Id === selectedId);

  const filteredMenuItems =
    selectedCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.CategoryId === selectedCategory);

  if (menuLoading || categoriesLoading) {
    return <div>Загрузка...</div>;
  }

  if (menuError || categoriesError) {
    return <div>Ошибка загрузки данных</div>;
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div className="w-full sm:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Все категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.Id} value={category.Id}>
                  {category.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={() => {
              setDialogMode('create');
              setDialogOpen(true);
            }}
            className="w-full sm:w-auto"
          >
            Создать элемент
          </Button>
          <Button
            onClick={() => {
              setDialogMode('edit');
              setDialogOpen(true);
            }}
            disabled={!selectedId}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Редактировать
          </Button>
          <Button
            onClick={async () => {
              if (selectedId) {
                await deleteMenuItem(selectedId);
                setSelectedId(null);
                refetchMenu();
              }
            }}
            disabled={!selectedId}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Удалить
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredMenuItems.map((item) => (
          <MenuItemCard
            key={item.Id}
            item={item}
            selected={selectedId === item.Id}
            onSelect={() => setSelectedId(item.Id)}
          />
        ))}
      </div>
      <MenuItemFormDialog
        open={dialogOpen}
        mode={dialogMode}
        onClose={() => setDialogOpen(false)}
        item={dialogMode === 'edit' ? selectedItem : undefined}
        onSubmit={async (data) => {
          if (dialogMode === 'create') {
            await createMenuItem(data);
          } else if (dialogMode === 'edit' && selectedItem) {
            await updateMenuItem({ id: selectedItem.Id, data });
          }
          refetchMenu();
        }}
        categories={categories.map((cat) => ({ id: cat.Id, name: cat.Name }))}
      />
    </div>
  );
};
