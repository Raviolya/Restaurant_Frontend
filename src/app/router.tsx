import { ROUTES } from '../shared/model/routes';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { App } from './app';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.POSITIONS,
        lazy: () =>
          import('@/features/positions-list/positions-list.page').then((module) => ({
            Component: module.default,
          })),
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
        lazy: () =>
          import('@/features/auth/login.page').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () =>
          import('@/features/auth/register.page').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: ROUTES.BASKET,
        lazy: () =>
          import('@/features/basket/basket.page').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.POSITIONS),
      },
    ],
  },
]);
