import { Link } from 'react-router';

import { LoginForm } from '@/components/ui/loginForm/login-form';

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-10 w-10 items-center justify-center">
            <img src="logo.svg" alt="logo" />
          </div>
          Poster Store
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
