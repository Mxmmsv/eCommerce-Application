import { useContext } from 'react';
import { useNavigate } from 'react-router';

import AuthContext from '@/feature/auth/login/auth-provider';

export function useLogout() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN_KEY');
    localStorage.setItem('AUTH_STATUS_KEY', 'false');
    setAuth(false);
    void navigate('/login');
  };

  return handleLogout;
}
