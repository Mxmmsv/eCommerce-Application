import { create } from 'zustand';

import { getAuthFromLocalStorage } from '@/service/store/local-storage';

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
  login: (token) => {
    set({ token, isAuthenticated: true });
    localStorage.setItem('ACCESS_TOKEN_KEY', token);
    localStorage.setItem('IS_AUTHORIZED', 'true');
  },
  logout: () => {
    set({ token: null, isAuthenticated: false });
    localStorage.removeItem('ACCESS_TOKEN_KEY');
    localStorage.removeItem('IS_AUTHORIZED');
  },
}));
