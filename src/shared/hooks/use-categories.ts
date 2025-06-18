import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/shared/api/categories';

export function useCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll(),
  });

  return {
    categories: data ?? [],
    isLoading,
    error,
  };
}
