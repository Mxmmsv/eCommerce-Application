import { valibotResolver } from '@hookform/resolvers/valibot';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import AuthContext from '@/feature/auth/login/auth-provider';
import { formSchema } from '@/feature/auth/login/login-schema';
import { signInCustomerWithMail } from '@/feature/auth/login/sign-in-customer';
import type { LoginForm } from '@/feature/auth/login/type';

export function useLoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const { setAuth } = useContext(AuthContext);

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

  const onSubmit = async (data: LoginForm) => {
    setLoginError(false);
    try {
      await signInCustomerWithMail(data.email, data.password);
      setAuth(true);
      await navigate('/');
      toast.success('Login successful!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Authorization error!`);
      } else toast.error('Unknown error');
      setLoginError(true);
      setAuth(false);
    }
  };

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
