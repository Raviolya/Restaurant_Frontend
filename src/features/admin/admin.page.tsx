import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';

export const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Панель администратора</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Статистика</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Здесь будет статистика */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние заказы</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Здесь будет список последних заказов */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Управление меню</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Здесь будут элементы управления меню */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
