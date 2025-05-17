import { valibotResolver } from '@hookform/resolvers/valibot';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { signInCustomerWithMail } from '@/feature/auth/login/sign-in-customer';
import type { LoginForm } from '@/feature/auth/login/types/type';
import { formSchema } from '@/feature/auth/login/validation';

export function useLoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

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
      await navigate('/');
      toast.success('Login successful!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Authorization error!`);
      } else toast.error('Unknown error');
      setLoginError(true);
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
