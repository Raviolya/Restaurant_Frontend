import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/api/query-client';
import { useEffect } from 'react';
import { AuthService } from '@/shared/services/auth.service';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AuthService.initialize();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster 
        position="top-right"
        expand={false}
        richColors
        closeButton
        duration={2000}
        toastOptions={{
          duration: 3000,
        }}
      />
    </QueryClientProvider>
  );
}
