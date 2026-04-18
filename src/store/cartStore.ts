import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../services/api';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },
      remove: (productId: number) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },
      updateQuantity: (productId: number, quantity: number) => {
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
    }
  )
);
