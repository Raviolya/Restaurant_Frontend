import { axiosInstance } from './axios';

export interface OrderItem {
  MenuItemId: string;
  Quantity: number;
  ExcludedIngredients: string[];
}

export interface CreateOrderDto {
  Items: OrderItem[];
}

export interface OrderItemResponse {
  Id: string;
  MenuItemId: string;
  MenuItemName: string;
  Quantity: number;
  ExcludedIngredients: string[];
  Price: number;
}

export interface OrderResponseDto {
  Id: string;
  UserId: string;
  UserName: string;
  TotalPrice: number;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
  OrderItems: OrderItemResponse[];
}

export const ordersApi = {
  createOrder: (orderData: CreateOrderDto) =>
    axiosInstance.post<OrderResponseDto>('/api/Orders', orderData),

  getOrderById: (id: string) =>
    axiosInstance.get<OrderResponseDto>(`/api/Orders/${id}`),

  getMyOrders: () =>
    axiosInstance.get<OrderResponseDto[]>('/api/Orders/my-orders'),

  getAllOrders: () =>
    axiosInstance.get<OrderResponseDto[]>('/api/Orders/admin'),

  updateOrderStatus: (id: string, status: string) =>
    axiosInstance.put<OrderResponseDto>(`/api/Orders/${id}/status?newStatus=${status}`),

  deleteOrder: (id: string) =>
    axiosInstance.delete(`/api/Orders/${id}`),
}; 