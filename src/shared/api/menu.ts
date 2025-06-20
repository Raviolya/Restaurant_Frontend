import { axiosInstance } from './axios';

export interface MenuItemDto {
  Id: string;
  Name: string;
  Description?: string;
  Price: number;
  CategoryId: string;
  CategoryName: string;
  Ingredients: string[];
  IsAvailable: boolean;
  ImageUrl?: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateMenuItemDto {
  Name: string;
  Description?: string;
  Price: number;
  CategoryId: string;
  Ingredients: string[];
  IsAvailable: boolean;
  ImageUrl?: string;
}

export interface UpdateMenuItemDto extends CreateMenuItemDto {}

export const menuApi = {
  async getMenuItems() {
    return axiosInstance.get<MenuItemDto[]>('/api/MenuItems');
  },
  async createMenuItem(data: CreateMenuItemDto) {
    return axiosInstance.post<MenuItemDto>('/api/MenuItems', data);
  },
  async updateMenuItem(id: string, data: UpdateMenuItemDto) {
    return axiosInstance.put<MenuItemDto>(`/api/MenuItems/${id}`, data);
  },
  async deleteMenuItem(id: string) {
    return axiosInstance.delete(`/api/MenuItems/${id}`);
  },
};
