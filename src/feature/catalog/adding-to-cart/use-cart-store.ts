import type { Cart } from '@commercetools/platform-sdk';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartStore = {
  cart: Cart | null;
  cartId: string | null;
  anonymousId: string | null;
  totalQuantity: number;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      anonymousId: null,
      cart: null,
      totalQuantity: 0,
      isAuthenticated: false,
      setCart: (cart) =>
        set({
          cartId: cart.id,
          cart: cart,
          totalQuantity: cart.lineItems.reduce((sum, item) => sum + item.quantity, 0),
        }),
      clearCart: () => set({ cartId: null, cart: null, totalQuantity: 0 }),
      isInCart: (productId: string) =>
        get().cart?.lineItems?.some((item) => item.productId === productId) ?? false,
    }),
    {
      name: 'CART-STORAGE',
    },
  ),
);
