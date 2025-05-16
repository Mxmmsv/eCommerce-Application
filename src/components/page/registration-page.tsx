import { Link } from 'react-router';

import { RegistrationForm } from '@/feature/registration/registration-form';
import type { RegistrationFormData } from '@/feature/registration/types';

export default function RegistrationPage() {
  const handleRegister = async (data: RegistrationFormData) => {
    await new Promise((res) => setTimeout(res, 100));
    console.log(data);
  };

  return (
    <div className="bg-muted flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-xl min-w-xs flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
            <img src="logo.svg" alt="logo" />
          </div>
          Poster Store
        </Link>
        <RegistrationForm onRegister={(data) => handleRegister(data)} />
      </div>
    </div>
  );
}
