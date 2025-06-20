import { useState, useEffect } from 'react';
import { MenuService } from '@/shared/services/menu.service';
import type { MenuItem } from '@/shared/api/menu';
import type { Category } from '@/shared/api/categories';
import { categoriesApi } from '@/shared/api/categories';

export const usePositions = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoriesApi.getAll();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Ошибка при загрузке категорий:', err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const items = selectedCategory
          ? await MenuService.getMenuItemsByCategory(selectedCategory)
          : await MenuService.getAllMenuItems();
        setMenuItems(items);
      } catch (err) {
        setError('Не удалось загрузить меню. Пожалуйста, попробуйте позже.');
        console.error('Ошибка при загрузке меню:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [selectedCategory]);

  const handleRetry = () => {
    window.location.reload();
  };

  return {
    menuItems,
    categories,
    selectedCategory,
    loading,
    error,
    setSelectedCategory,
    handleRetry,
  };
}; 