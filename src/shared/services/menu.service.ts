import { menuApi } from '../api/menu';
import type { MenuItem } from '../api/menu';

export class MenuService {
  static async getAllMenuItems(): Promise<MenuItem[]> {
    try {
      return await menuApi.getAll();
    } catch (error) {
      console.error('Ошибка при получении меню:', error);
      throw error;
    }
  }

  static async getMenuItemById(id: string): Promise<MenuItem> {
    try {
      return await menuApi.getById(id);
    } catch (error) {
      console.error(`Ошибка при получении элемента меню с ID ${id}:`, error);
      throw error;
    }
  }

  static async getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    try {
      return await menuApi.getByCategory(categoryId);
    } catch (error) {
      console.error(`Ошибка при получении элементов меню категории ${categoryId}:`, error);
      throw error;
    }
  }

  static async searchMenuItems(params: {
    searchTerm?: string;
    categoryId?: string;
    isAvailable?: boolean;
  }): Promise<MenuItem[]> {
    try {
      return await menuApi.search(params);
    } catch (error) {
      console.error('Ошибка при поиске элементов меню:', error);
      throw error;
    }
  }
} 