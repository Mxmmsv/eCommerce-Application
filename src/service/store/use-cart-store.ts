import type { Cart } from '@commercetools/platform-sdk';
import { create } from 'zustand';

import { fetchCart } from '@/feature/api/api-fetch-cart';

type CartStore = {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  isLoading: false,
  error: null,
  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await fetchCart();
      set({ cart, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load cart';
      set({ error: message, isLoading: false });
    }
  },
}));
