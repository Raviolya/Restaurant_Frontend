import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs';
import { OrdersList } from './components/orders-list';
import { Reports } from './components/reports';
import { useOrders } from './hooks/use-orders';
import { ROUTES } from '@/shared/model/routes';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/shared/lib/css';
import { MenuManagementPage } from './components/menu-management.page';

const adminNavItems = [
  { path: ROUTES.ADMIN.DASHBOARD, label: 'Статистика' },
  { path: ROUTES.ADMIN.ORDERS, label: 'Заказы' },
  { path: ROUTES.ADMIN.MENU, label: 'Управление меню' },
];

export const AdminDashboardPage = () => {
  const { allOrders, pendingOrders, isLoading } = useOrders();
  const location = useLocation();

  return (
    <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-8 border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Панель администратора</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <ul className="flex lg:flex-col gap-2 lg:space-y-2 overflow-x-auto lg:overflow-x-visible">
              {adminNavItems.map((item) => (
                <li key={item.path} className="flex-shrink-0">
                  <Link
                    to={item.path}
                    className={cn(
                      'block px-4 py-2 rounded-md transition-colors whitespace-nowrap',
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-gray-100'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex-1">
          {location.pathname === ROUTES.ADMIN.DASHBOARD && (
            <Card>
              <CardHeader>
                <CardTitle>Статистика и отчеты</CardTitle>
              </CardHeader>
              <CardContent>
                <Reports />
              </CardContent>
            </Card>
          )}

          {location.pathname === ROUTES.ADMIN.ORDERS && (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full sm:w-auto mb-4">
                <TabsTrigger value="all" className="flex-1 sm:flex-none">
                  Все заказы
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex-1 sm:flex-none">
                  Ожидающие заказы
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>Все заказы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OrdersList orders={allOrders || []} isLoading={isLoading} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>Ожидающие заказы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OrdersList orders={pendingOrders || []} isLoading={isLoading} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {location.pathname === ROUTES.ADMIN.MENU && (
            <Card>
              <CardHeader>
                <CardTitle>Управление меню</CardTitle>
              </CardHeader>
              <CardContent>
                <MenuManagementPage />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
