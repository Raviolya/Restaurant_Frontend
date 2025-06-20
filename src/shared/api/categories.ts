import { axiosInstance } from './axios';

export interface Category {
  Id: string;
  Name: string;
}

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get('/api/Categories');
    return data;
  },
}; 