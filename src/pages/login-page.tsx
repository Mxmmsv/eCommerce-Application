import { useContext } from 'react';
import { Link, Navigate } from 'react-router';

import AuthContext from '@/feature/auth/login/auth-provider';
import { LoginForm } from '@/feature/auth/login/login-form';

export default function LoginPage() {
  const { IS_AUTHORIZED } = useContext(AuthContext);

  if (IS_AUTHORIZED) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
            <img src="logo.svg" alt="logo" />
          </div>
          Poster Shop
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
