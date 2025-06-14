import type { Cart } from '@commercetools/platform-sdk';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartStore = {
  cart: Cart | null;
  anonymousId: string | null;
  setCart: (cart: Cart) => void;
  setAnonymousId: (id: string) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
  isInCart: (productId: string) => boolean;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      anonymousId: null,
      setCart: (cart) => set({ cart }),
      setAnonymousId: (id) => set({ anonymousId: id }),
      clearCart: () => set({ cart: null }),
      getTotalQuantity: () =>
        get().cart?.lineItems.reduce((sum, item) => sum + item.quantity, 0) || 0,
      isInCart: (productId) =>
        get().cart?.lineItems.some((item) => item.productId === productId) || false,
    }),
    { name: 'CART-STORAGE' },
  ),
);
