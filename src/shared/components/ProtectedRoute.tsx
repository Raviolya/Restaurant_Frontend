import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../lib/store/auth.store';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    toast.error('Необходима авторизация');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    toast.error('Недостаточно прав для доступа');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
