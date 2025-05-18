import { AlertCircle } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { RegistrationFormData } from '../types';

type PasswordFieldsProps = {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
};

export function PasswordField({ register, errors }: PasswordFieldsProps) {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: 'Required field' })}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
          )}
        </div>
        {errors.password && (
          <p className="error-message text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
    </>
  );
}
