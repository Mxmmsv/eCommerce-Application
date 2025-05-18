import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { RegistrationFormData } from '../types';

type StreetFieldProps = {
  prefix?: 'alternativeShipping' | 'alternativeBilling';
};

export function StreetField({ prefix }: StreetFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  const fieldName: keyof RegistrationFormData = prefix ? `${prefix}Street` : 'streetName';
  const error = errors[fieldName as keyof typeof errors];

  return (
    <div className="grid gap-2">
      <Label htmlFor={fieldName}>{prefix ? 'Alternative Street' : 'Street'}</Label>
      <div className="relative">
        <Input id={fieldName} {...register(fieldName)} aria-invalid={!!error} />
        {error && (
          <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
        )}
      </div>
      {error && <p className="error-message text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
