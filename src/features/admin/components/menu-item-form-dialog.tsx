import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/kit/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/shared/ui/kit/form';
import { useEffect } from 'react';
import { type MenuItemDto, type CreateMenuItemDto } from '@/shared/api/menu';

const menuItemSchema = z.object({
  Name: z.string().min(3, 'Минимум 3 символа'),
  Description: z.string().max(500).optional(),
  Price: z.coerce.number().min(0.01, 'Цена должна быть больше 0'),
  CategoryId: z.string().uuid({ message: 'Выберите категорию' }),
  Ingredients: z.string().optional(), // строка, разделённая запятыми
  IsAvailable: z.boolean(),
  ImageUrl: z.string().url('Некорректный URL').optional().or(z.literal('')),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

export const MenuItemFormDialog = ({
  open,
  onClose,
  mode,
  item,
  onSubmit: onSubmitProp,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  item?: MenuItemDto;
  onSubmit: (data: CreateMenuItemDto) => Promise<void>;
  categories: { id: string; name: string }[];
}) => {
  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      Name: '',
      Description: '',
      Price: 0,
      CategoryId: '',
      Ingredients: '',
      IsAvailable: true,
      ImageUrl: '',
    },
  });

  useEffect(() => {
    if (item && mode === 'edit') {
      form.reset({
        Name: item.Name,
        Description: item.Description ?? '',
        Price: item.Price,
        CategoryId: item.CategoryId,
        Ingredients: item.Ingredients?.join(', ') ?? '',
        IsAvailable: item.IsAvailable,
        ImageUrl: item.ImageUrl ?? '',
      });
    } else {
      form.reset();
    }
  }, [item, mode, form]);

  const onSubmit = async (data: MenuItemFormValues) => {
    await onSubmitProp({
      ...data,
      Ingredients: data.Ingredients
        ? data.Ingredients.split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-lg">
        <DialogTitle className="text-lg sm:text-xl">
          {mode === 'create' ? 'Создать элемент меню' : 'Редактировать элемент меню'}
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Название</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Описание</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Цена</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Категория</FormLabel>
                  <FormControl>
                    <select {...field} className="input text-sm sm:text-base w-full">
                      <option value="">Выберите категорию</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Ингредиенты (через запятую)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="IsAvailable"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </FormControl>
                  <FormLabel className="text-sm sm:text-base">В наличии</FormLabel>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">URL картинки</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-sm sm:text-base">
              {mode === 'create' ? 'Создать' : 'Сохранить'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
