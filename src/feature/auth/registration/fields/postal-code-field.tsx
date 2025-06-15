import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { RegistrationFormData } from '../types';

type PostalCodeFieldProps = {
  prefix?: 'alternativeShipping' | 'alternativeBilling';
};

export function PostalCodeField({ prefix }: PostalCodeFieldProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<RegistrationFormData>();

  const fieldName: keyof RegistrationFormData = prefix ? `${prefix}PostalCode` : 'postalCode';
  const countryFieldName: keyof RegistrationFormData = prefix ? `${prefix}Country` : 'country';
  const error = errors[fieldName as keyof typeof errors];
  const country = watch(countryFieldName);

  return (
    <div className="grid gap-2">
      <Label htmlFor={fieldName}>{prefix ? 'Alternative Postal Code' : 'Postal Code'}</Label>
      <div className="relative">
        <Input id={fieldName} {...register(fieldName)} aria-invalid={!!error} disabled={!country} />
        {error && (
          <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
        )}
      </div>
      {error && <p className="error-message text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
