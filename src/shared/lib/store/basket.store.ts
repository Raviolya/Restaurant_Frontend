import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '@/shared/api/menu';

export interface BasketItem {
  Id: string;
  Name: string;
  Price: number;
  ImageUrl?: string;
  Ingredients: string[];
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (item: Omit<BasketItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string, ingredients: string[]) => void;
  clear: () => void;
  getCount: () => number;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        set((state) => {
          const idx = state.items.findIndex(
            (i) =>
              i.Id === item.Id && JSON.stringify(i.Ingredients) === JSON.stringify(item.Ingredients)
          );
          if (idx > -1) {
            const updated = [...state.items];
            updated[idx].quantity += quantity;
            return { items: updated };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
      },
      removeItem: (id, ingredients) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.Id === id && JSON.stringify(i.Ingredients) === JSON.stringify(ingredients))
          ),
        }));
      },
      clear: () => set({ items: [] }),
      getCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: 'basket-storage',
    }
  )
);
