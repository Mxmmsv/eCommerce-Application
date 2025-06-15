import { AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { RegistrationFormData } from '../types';

export function PasswordField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            {...register('password', { required: 'Required field' })}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute top-1/2 ${errors.password ? 'right-10' : 'right-3'} -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700`}
          >
            {showPassword ? (
              <ToggleRight className="h-5 w-5" />
            ) : (
              <ToggleLeft className="h-5 w-5" />
            )}
          </button>
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
