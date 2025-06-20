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

  getOrderById: (id: string) => axiosInstance.get<OrderResponseDto>(`/api/Orders/${id}`),

  getMyOrders: () => axiosInstance.get<OrderResponseDto[]>('/api/Orders/my-orders'),

  getAllOrders: async () => {
    const { data } = await axiosInstance.get<OrderResponseDto[]>('/api/Orders/admin');
    return data;
  },

  getPendingOrders: async () => {
    const { data } = await axiosInstance.get<OrderResponseDto[]>('/api/Orders/pending');
    return data;
  },

  updateOrderStatus: async (orderId: string, newStatus: string) => {
    const { data } = await axiosInstance.put<OrderResponseDto>(
      `/api/Orders/${orderId}/status?newStatus=${newStatus}`
    );
    return data;
  },

  deleteOrder: (id: string) => axiosInstance.delete(`/api/Orders/${id}`),
};
