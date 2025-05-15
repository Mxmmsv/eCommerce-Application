import { AlertCircle } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { RegistrationFormData } from '../types';

type AddressFieldsProps = {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
};

export function EmailField({ register, errors }: AddressFieldsProps) {
  return (
    <>
      <div className="mt-6 grid gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email', {
              required: 'Required field',
            })}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
          )}
        </div>
        {errors.email && (
          <p className="error-message text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
    </>
  );
}
