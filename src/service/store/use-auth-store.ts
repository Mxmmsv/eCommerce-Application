import { create } from 'zustand';

import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { getAuthFromLocalStorage, setAuthToLocalStorage } from '@/service/store/local-storage';

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const { ACCESS_TOKEN_KEY, IS_AUTHORIZED } = getAuthFromLocalStorage();

export const useAuthStore = create<AuthState>((set) => ({
  token: ACCESS_TOKEN_KEY,
  isAuthenticated: IS_AUTHORIZED,
  login: (token: string, customerId?: string) => {
    set({ token, isAuthenticated: true });
    setAuthToLocalStorage(token, true, customerId);
  },
  logout: () => {
    set({ token: null, isAuthenticated: false });
    ['ACCESS_TOKEN_KEY', 'IS_AUTHORIZED', 'CUSTOMER_ID'].forEach((key) =>
      localStorage.removeItem(key),
    );
    useCartStore.getState().clearCart();
  },
}));
