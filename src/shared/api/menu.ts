import { axiosInstance } from './axios';

export interface MenuItem {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  CategoryId: string;
  CategoryName: string;
  Ingredients: string[];
  IsAvailable: boolean;
  ImageUrl: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export const menuApi = {
  getAll: async (): Promise<MenuItem[]> => {
    const { data } = await axiosInstance.get('/api/MenuItems');
    return data;
  },

  getById: async (id: string): Promise<MenuItem> => {
    const { data } = await axiosInstance.get(`/api/MenuItems/${id}`);
    return data;
  },

  getByCategory: async (categoryId: string): Promise<MenuItem[]> => {
    const { data } = await axiosInstance.get(`/api/MenuItems/category/${categoryId}`);
    return data;
  },

  search: async (params: {
    searchTerm?: string;
    categoryId?: string;
    isAvailable?: boolean;
  }): Promise<MenuItem[]> => {
    const { data } = await axiosInstance.get('/api/MenuItems/search', { params });
    return data;
  },
}; 