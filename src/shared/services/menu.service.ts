import { menuApi } from '../api/menu';
import type { MenuItemDto } from '../api/menu';

export class MenuService {
  static async getAllMenuItems(): Promise<MenuItemDto[]> {
    try {
      const response = await menuApi.getMenuItems();
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении меню:', error);
      throw error;
    }
  }

  static async getMenuItemById(id: string): Promise<MenuItemDto> {
    try {
      const response = await menuApi.getMenuItems();
      const item = response.data.find((item) => item.Id === id);
      if (!item) {
        throw new Error(`Элемент меню с ID ${id} не найден`);
      }
      return item;
    } catch (error) {
      console.error(`Ошибка при получении элемента меню с ID ${id}:`, error);
      throw error;
    }
  }

  static async getMenuItemsByCategory(categoryId: string): Promise<MenuItemDto[]> {
    try {
      const response = await menuApi.getMenuItems();
      return response.data.filter((item) => item.CategoryId === categoryId);
    } catch (error) {
      console.error(`Ошибка при получении элементов меню категории ${categoryId}:`, error);
      throw error;
    }
  }

  static async searchMenuItems(params: {
    searchTerm?: string;
    categoryId?: string;
    isAvailable?: boolean;
  }): Promise<MenuItemDto[]> {
    try {
      const response = await menuApi.getMenuItems();
      return response.data.filter((item) => {
        if (params.categoryId && item.CategoryId !== params.categoryId) return false;
        if (params.isAvailable !== undefined && item.IsAvailable !== params.isAvailable)
          return false;
        if (params.searchTerm) {
          const searchLower = params.searchTerm.toLowerCase();
          return (
            item.Name.toLowerCase().includes(searchLower) ||
            item.Description?.toLowerCase().includes(searchLower)
          );
        }
        return true;
      });
    } catch (error) {
      console.error('Ошибка при поиске элементов меню:', error);
      throw error;
    }
  }
}
