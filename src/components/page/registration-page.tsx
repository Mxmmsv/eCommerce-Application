import { Link, useNavigate } from 'react-router';

import { handleRegister } from '@/feature/registration/registration-actions.tsx';
import { RegistrationForm } from '@/feature/registration/registration-form';

export default function RegistrationPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
            <img src="logo.svg" alt="logo" />
          </div>
          Poster Store
        </Link>
        <RegistrationForm onRegister={(data) => handleRegister(data, navigate)} />
      </div>
    </div>
  );
}
