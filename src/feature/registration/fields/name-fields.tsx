import { AlertCircle } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { RegistrationFormData } from '../types';

type AddressFieldsProps = {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
};

export function NameFields({ register, errors }: AddressFieldsProps) {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="firstName">First name</Label>
        <div className="relative">
          <Input
            id="firstName"
            {...register('firstName', { required: 'Required field' })}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
          )}
        </div>
        {errors.firstName && (
          <p className="error-message text-sm text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="lastName">Last name</Label>
        <div className="relative">
          <Input
            id="lastName"
            {...register('lastName', { required: 'Required field' })}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
          )}
        </div>
        {errors.lastName && (
          <p className="error-message text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>
    </>
  );
}
