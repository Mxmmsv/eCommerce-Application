import { createContext, useState, useMemo, useEffect, type ReactNode } from 'react';

import { getAuthFromLocalStorage } from '@/service/store/local-storage';

import type { AuthContext } from './type';

const AuthContext = createContext<AuthContext>({
  IS_AUTHORIZED: false,
  setIsAuthorized: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [IS_AUTHORIZED, setIsAuthorized] = useState(() => {
    const { ACCESS_TOKEN_KEY, IS_AUTHORIZED } = getAuthFromLocalStorage();
    return !!ACCESS_TOKEN_KEY && !!IS_AUTHORIZED;
  });

  useEffect(() => {
    localStorage.setItem('IS_AUTHORIZED', String(IS_AUTHORIZED));
    if (!IS_AUTHORIZED) localStorage.removeItem('ACCESS_TOKEN_KEY');
  }, [IS_AUTHORIZED]);

  const value = useMemo(() => ({ IS_AUTHORIZED, setIsAuthorized }), [IS_AUTHORIZED]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
