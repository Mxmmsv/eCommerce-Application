import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { RegistrationFormData } from '../types';

export function StreetField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  return (
    <div className="grid gap-2">
      <Label htmlFor="streetName">Street</Label>
      <div className="relative">
        <Input id="streetName" {...register('streetName')} aria-invalid={!!errors.streetName} />
        {errors.streetName && (
          <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
        )}
      </div>
      {errors.streetName && (
        <p className="error-message text-sm text-red-500">{errors.streetName.message}</p>
      )}
    </div>
  );
}
