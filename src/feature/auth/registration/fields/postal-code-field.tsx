import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { RegistrationFormData } from '../types';

export function PostalCodeField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  return (
    <div className="grid gap-2">
      <Label htmlFor="postalCode">Postal code</Label>
      <div className="relative">
        <Input id="postalCode" {...register('postalCode')} aria-invalid={!!errors.postalCode} />
        {errors.postalCode && (
          <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
        )}
      </div>
      {errors.postalCode && (
        <p className="error-message text-sm text-red-500">{errors.postalCode.message}</p>
      )}
    </div>
  );
}
