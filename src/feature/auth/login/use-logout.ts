import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { clearTokenCache } from '@/feature/api/api-token-store';
import AuthContext from '@/feature/auth/login/auth-provider';

export function useLogout() {
  const { setIsAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearTokenCache();
    setIsAuthorized(false);
    void navigate('/login');
  };

  return handleLogout;
}
