import { Link } from 'react-router';

import { RegistrationForm } from '@/feature/registration/registration-form';

export default function RegistrationPage() {
  return (
    <div className="bg-muted flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-xl min-w-xs flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-10 w-10 items-center justify-center">
            <img src="logo.svg" alt="logo" />
          </div>
          Poster Store
        </Link>
        <RegistrationForm />
      </div>
    </div>
  );
}
