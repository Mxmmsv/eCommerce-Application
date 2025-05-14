import { createContext, useState, useMemo, useEffect, type ReactNode } from 'react';

import type { AuthContextType } from '@/feature/auth/login/types/type';
import { getTokenFromLocalStorage } from '@/service/store/local-storage';

const AuthContext = createContext<AuthContextType>({
  isAuthorized: false,
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setAuth] = useState(() => {
    const { token, isAuthorized } = getTokenFromLocalStorage();
    return !!token && !!isAuthorized;
  });

  useEffect(() => {
    localStorage.setItem('isAuthorized', String(isAuthorized));
    if (!isAuthorized) delete localStorage.access_token;
  }, [isAuthorized]);

  const value = useMemo(() => ({ isAuthorized, setAuth }), [isAuthorized]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
