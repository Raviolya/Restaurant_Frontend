import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  menuApi,
  type MenuItemDto,
  type CreateMenuItemDto,
  type UpdateMenuItemDto,
} from '@/shared/api/menu';

export function useMenuItems() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['menuItems'],
    queryFn: () => menuApi.getMenuItems().then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateMenuItemDto) => menuApi.createMenuItem(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['menuItems'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMenuItemDto }) =>
      menuApi.updateMenuItem(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['menuItems'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => menuApi.deleteMenuItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['menuItems'] }),
  });

  return {
    menuItems: data ?? [],
    isLoading,
    error,
    refetch,
    createMenuItem: createMutation.mutateAsync,
    updateMenuItem: updateMutation.mutateAsync,
    deleteMenuItem: deleteMutation.mutateAsync,
  };
}
