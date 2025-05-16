import { createContext, useState, useMemo, useEffect, type ReactNode } from 'react';

import type { AuthContextType } from '@/feature/auth/login/types/type';
import { getAuthFromLocalStorage } from '@/service/store/local-storage';

const AuthContext = createContext<AuthContextType>({
  AUTH_STATUS_KEY: false,
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [AUTH_STATUS_KEY, setAuth] = useState(() => {
    const { ACCESS_TOKEN_KEY, AUTH_STATUS_KEY } = getAuthFromLocalStorage();
    return !!ACCESS_TOKEN_KEY && !!AUTH_STATUS_KEY;
  });

  useEffect(() => {
    localStorage.setItem('AUTH_STATUS_KEY', String(AUTH_STATUS_KEY));
    if (!AUTH_STATUS_KEY) localStorage.removeItem('ACCESS_TOKEN_KEY');
  }, [AUTH_STATUS_KEY]);

  const value = useMemo(() => ({ AUTH_STATUS_KEY, setAuth }), [AUTH_STATUS_KEY]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
