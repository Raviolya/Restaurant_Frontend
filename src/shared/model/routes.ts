import 'react-router-dom';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  POSITIONS: '/position',
  POSITION: '/position/:positionId',
  BASKET: '/basket',
  PROFILE: '/profile',
} as const;

export type PathParams = {
  [ROUTES.POSITIONS]: {
    boardId: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
