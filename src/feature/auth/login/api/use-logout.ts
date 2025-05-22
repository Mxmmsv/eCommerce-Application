import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { clearTokenCache } from '@/feature/api/api-token-store';
import AuthContext from '@/feature/auth/login/auth-provider';
import { useCustomerStore } from '@/service/store/use-user-store';

export function useLogout() {
  const { setIsAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearTokenCache();
    setIsAuthorized(false);
    useCustomerStore.getState().clearCustomer();
    void navigate('/login');
    toast.success('Logout successful!');
  };

  return handleLogout;
}
