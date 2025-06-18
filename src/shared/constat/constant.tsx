export const UserRole = {
  ADMIN: 'Admin',
  USER: 'User',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export const OrderStatus = {
  PENDING: 'Pending',
  PREPARING: 'Preparing',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];
