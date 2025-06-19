import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import AuthContext from '@/feature/auth/login/auth-provider';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { useCustomerStore } from '@/service/store/use-user-store';

export function useLogout() {
  const { setIsAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('ACCESS_TOKEN_KEY');
    setIsAuthorized(false);
    useCustomerStore.getState().clearCustomer();
    useCartStore.getState().clearCart();
    void navigate('/login');
    toast.success('Logout successful!');
  }, [setIsAuthorized, navigate]);

  return handleLogout;
}
