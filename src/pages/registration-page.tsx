import { useNavigate } from 'react-router';

import { handleRegister } from '@/feature/auth/registration/registration-actions.tsx';
import { RegistrationForm } from '@/feature/auth/registration/registration-form';

export default function RegistrationPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-muted flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-xl min-w-xs flex-col gap-6">
        <RegistrationForm onRegister={(data) => handleRegister(data, navigate)} />
      </div>
    </div>
  );
}
