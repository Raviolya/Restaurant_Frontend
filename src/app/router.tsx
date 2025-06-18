import { ROUTES } from '../shared/model/routes';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { App } from './app';
import { Providers } from './providers';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { lazy, Suspense } from 'react';
import { Component as BasketPage } from '@/features/basket/basket.page';
import { Component as OrdersPage } from '@/features/orders/orders.page';
import { AdminDashboardPage } from '@/features/admin/admin.page';
import { UserRole } from '@/shared/constat/constant';

const ProfilePage = lazy(() =>
  import('@/features/profile/profile.page').then((module) => ({
    default: module.Component,
  }))
);

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.POSITIONS,
        lazy: () => import('@/features/positions-list/positions-list.page'),
      },
      {
        path: ROUTES.POSITION,
        lazy: () =>
          import('@/features/position/position.page').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page'),
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Загрузка...</div>}>
              <ProfilePage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.BASKET,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Загрузка...</div>}>
              <BasketPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.POSITIONS),
      },
      {
        path: ROUTES.ORDERS,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Загрузка...</div>}>
              <OrdersPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.ADMIN.DASHBOARD,
        element: (
          <ProtectedRoute requiredRole={UserRole.ADMIN}>
            <Suspense fallback={<div>Загрузка...</div>}>
              <AdminDashboardPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.ADMIN.ORDERS,
        element: (
          <ProtectedRoute requiredRole={UserRole.ADMIN}>
            <Suspense fallback={<div>Загрузка...</div>}>
              <AdminDashboardPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.ADMIN.MENU,
        element: (
          <ProtectedRoute requiredRole={UserRole.ADMIN}>
            <Suspense fallback={<div>Загрузка...</div>}>
              <AdminDashboardPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
