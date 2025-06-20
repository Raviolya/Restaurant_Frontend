import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Button } from '@/shared/ui/kit/button';
import { Calendar } from '@/shared/ui/kit/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/kit/popover';
import { format, isValid } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '@/shared/api/reports';
import { cn } from '@/shared/lib/css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs';
import { toast } from 'sonner';

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (!isValid(date)) {
      return 'Некорректная дата';
    }
    return format(date, 'dd.MM.yyyy', { locale: ru });
  } catch (error) {
    return 'Некорректная дата';
  }
};

export const Reports = () => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [forceRefresh, setForceRefresh] = useState(false);

  const { data: salesReport, isLoading: isLoadingSales } = useQuery({
    queryKey: ['reports', 'sales', startDate, endDate, forceRefresh],
    queryFn: () => reportsApi.getSalesReport(startDate, endDate, forceRefresh),
  });

  const { data: revenueReport, isLoading: isLoadingRevenue } = useQuery({
    queryKey: ['reports', 'revenue', startDate, endDate, forceRefresh],
    queryFn: () => reportsApi.getRevenueReport(startDate, endDate, forceRefresh),
  });

  const handleRefresh = () => {
    setForceRefresh(true);
    toast.success('Отчеты обновлены');
    setTimeout(() => setForceRefresh(false), 1000);
  };

  const renderSalesReport = () => {
    if (!salesReport) return null;

    const items = salesReport.items || [];
    const categoryRevenue = items.reduce(
      (acc, item) => {
        acc[item.categoryName] = (acc[item.categoryName] || 0) + item.totalRevenue;
        return acc;
      },
      {} as Record<string, number>
    );

    return (
      <div className="grid gap-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-2xl">Общая статистика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-muted rounded-lg">
                    <div className="text-base text-muted-foreground">Всего продано товаров</div>
                    <div className="text-3xl font-bold mt-2">{salesReport.totalItemsSold}</div>
                  </div>
                  <div className="p-6 bg-muted rounded-lg">
                    <div className="text-base text-muted-foreground">Общая выручка</div>
                    <div className="text-3xl font-bold mt-2">{salesReport.totalRevenue} ₽</div>
                  </div>
                </div>
                <div className="p-6 bg-muted rounded-lg">
                  <div className="text-base text-muted-foreground">Период</div>
                  <div className="text-xl mt-2">
                    {formatDate(salesReport.startDate)} - {formatDate(salesReport.endDate)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Топ продаж</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.menuItemId} className="p-6 bg-muted rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-xl">{item.menuItemName}</div>
                        <div className="text-base text-muted-foreground mt-1">
                          {item.categoryName}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">{item.quantitySold} шт.</div>
                        <div className="text-xl font-bold text-primary mt-1">
                          {item.totalRevenue} ₽
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Выручка по категориям</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(categoryRevenue).map(([category, revenue]) => (
                <div key={category} className="p-6 bg-muted rounded-lg">
                  <div className="flex flex-col">
                    <div className="font-medium text-xl">{category}</div>
                    <div className="text-base text-muted-foreground mt-1">
                      {((revenue / salesReport.totalRevenue) * 100).toFixed(1)}% от общей выручки
                    </div>
                    <div className="text-2xl font-bold mt-2">{revenue} ₽</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderRevenueReport = () => {
    if (!revenueReport) return null;

    return (
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Общая статистика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-muted rounded-lg">
                <div className="text-base text-muted-foreground">Общая выручка</div>
                <div className="text-3xl font-bold mt-2">{revenueReport.totalRevenue} ₽</div>
              </div>
              <div className="p-6 bg-muted rounded-lg">
                <div className="text-base text-muted-foreground">Период</div>
                <div className="text-xl mt-2">
                  {formatDate(revenueReport.startDate)} - {formatDate(revenueReport.endDate)}
                </div>
              </div>
              <div className="p-6 bg-muted rounded-lg">
                <div className="text-base text-muted-foreground">Сгенерировано</div>
                <div className="text-xl mt-2">{formatDate(revenueReport.generatedAt)}</div>
              </div>
              <div className="p-6 bg-muted rounded-lg">
                <div className="text-base text-muted-foreground">Из кэша</div>
                <div className="text-xl mt-2">{revenueReport.fromCache ? 'Да' : 'Нет'}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="space-y-2 w-full sm:w-auto">
            <label className="text-sm font-medium">От</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn('w-full sm:w-[240px] justify-start text-left font-normal')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PPP', { locale: ru }) : 'Выберите дату'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2 w-full sm:w-auto">
            <label className="text-sm font-medium">До</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn('w-full sm:w-[240px] justify-start text-left font-normal')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PPP', { locale: ru }) : 'Выберите дату'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => date && setEndDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button onClick={handleRefresh} disabled={forceRefresh} className="w-full sm:w-auto">
          Обновить отчеты
        </Button>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="sales" className="flex-1 sm:flex-none">
            Отчет о продажах
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex-1 sm:flex-none">
            Отчет о выручке
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-6">
          {isLoadingSales ? (
            <div>Загрузка отчета о продажах...</div>
          ) : (
            <div className="max-w-[1400px] mx-auto">{renderSalesReport()}</div>
          )}
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          {isLoadingRevenue ? (
            <div>Загрузка отчета о выручке...</div>
          ) : (
            <div className="max-w-[1400px] mx-auto">{renderRevenueReport()}</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
