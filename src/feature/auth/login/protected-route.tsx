import { useContext, useEffect, useRef } from 'react';
import { Navigate } from 'react-router';
import { toast } from 'sonner';

import AuthContext from './auth-provider';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { IS_AUTHORIZED } = useContext(AuthContext);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!IS_AUTHORIZED && !hasShownToast.current) {
      toast.warning('Oops! You need to log in first.');
      hasShownToast.current = true;
    }
  }, [IS_AUTHORIZED]);

  if (!IS_AUTHORIZED) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
