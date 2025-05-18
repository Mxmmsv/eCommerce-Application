import { valibotResolver } from '@hookform/resolvers/valibot';
import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { signInCustomer } from '@/feature/api/sign-in-customer';

import AuthContext from './auth-provider';
import { formSchema } from './login-schema';
import type { LoginForm } from './type';

export function useLoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const { setIsAuthorized } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<LoginForm>({
    resolver: valibotResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      setLoginError(false);
      try {
        await signInCustomer(data.email, data.password);
        setIsAuthorized(true);
        await navigate('/');
        toast.success('Login successful!');
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Authorization error!');
        } else {
          toast.error('Unknown error');
        }
        setLoginError(true);
        setIsAuthorized(false);
      }
    },
    [navigate, setIsAuthorized],
  );

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    setShowPassword,
    loginError,
    trigger,
    watch,
  };
}
