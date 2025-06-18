import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '@/features/header/AppHeader';

interface AppLayoutProps {
  children?: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  );
};
