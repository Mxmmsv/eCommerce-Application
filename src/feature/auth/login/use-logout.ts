import { useContext } from 'react';
import { useNavigate } from 'react-router';

import AuthContext from '@/feature/auth/login/auth-provider';

export function useLogout() {
  const { setIsAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN_KEY');
    setIsAuthorized(false);
    void navigate('/login');
  };

  return handleLogout;
}
