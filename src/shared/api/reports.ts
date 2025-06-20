import { axiosInstance } from './axios';

export interface SalesReportItemDto {
  MenuItemId: string;
  MenuItemName: string;
  CategoryName: string;
  QuantitySold: number;
  TotalRevenue: number;
}

export interface SalesReportDto {
  StartDate: string;
  EndDate: string;
  TotalRevenue: number;
  TotalItemsSold: number;
  Items: SalesReportItemDto[];
  GeneratedAt: string;
  FromCache: boolean;
}

export interface RevenueReportDto {
  StartDate: string;
  EndDate: string;
  TotalRevenue: number;
  GeneratedAt: string;
  FromCache: boolean;
}

const mapSalesReportItem = (item: SalesReportItemDto) => ({
  menuItemId: item.MenuItemId,
  menuItemName: item.MenuItemName,
  categoryName: item.CategoryName,
  quantitySold: item.QuantitySold,
  totalRevenue: item.TotalRevenue,
});

const mapSalesReport = (data: SalesReportDto) => ({
  startDate: data.StartDate,
  endDate: data.EndDate,
  totalRevenue: data.TotalRevenue,
  totalItemsSold: data.TotalItemsSold,
  items: data.Items.map(mapSalesReportItem),
  generatedAt: data.GeneratedAt,
  fromCache: data.FromCache,
});

const mapRevenueReport = (data: RevenueReportDto) => ({
  startDate: data.StartDate,
  endDate: data.EndDate,
  totalRevenue: data.TotalRevenue,
  generatedAt: data.GeneratedAt,
  fromCache: data.FromCache,
});

export const reportsApi = {
  getSalesReport: async (startDate: Date, endDate: Date, forceRefresh: boolean = false) => {
    const { data } = await axiosInstance.get<SalesReportDto>('/api/Reports/sales', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        forceRefresh,
      },
    });
    return mapSalesReport(data);
  },

  getRevenueReport: async (startDate: Date, endDate: Date, forceRefresh: boolean = false) => {
    const { data } = await axiosInstance.get<RevenueReportDto>('/api/Reports/revenue', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        forceRefresh,
      },
    });
    return mapRevenueReport(data);
  },
};
