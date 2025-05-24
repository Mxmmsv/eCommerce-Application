import { useContext, useEffect, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import AuthContext from './auth-provider';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { IS_AUTHORIZED } = useContext(AuthContext);
  const hasShownToast = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!IS_AUTHORIZED && !hasShownToast.current) {
      toast.warning('Oops! You need to log in first.');
      hasShownToast.current = true;
      void navigate('/login');
    }
  }, [IS_AUTHORIZED, navigate]);

  return children;
};

export default ProtectedRoute;
