import { useContext } from 'react';
import { useNavigate } from 'react-router';

import AuthContext from '@/feature/auth/login/auth-provider';
import { handleRegister } from '@/feature/auth/registration/registration-actions.tsx';
import { RegistrationForm } from '@/feature/auth/registration/registration-form';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { setIsAuthorized } = useContext(AuthContext);

  return (
    <>
      <title>{'Registration :: Poster store'}</title>
      <div className="bg-muted flex min-h-svh items-center justify-center p-6">
        <div className="flex w-full max-w-xl min-w-xs flex-col gap-6">
          <RegistrationForm
            onRegister={(data) => handleRegister(data, navigate, setIsAuthorized)}
          />
        </div>
      </div>
    </>
  );
}
