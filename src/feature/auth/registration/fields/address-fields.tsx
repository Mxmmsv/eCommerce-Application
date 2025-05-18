import { AlertCircle } from 'lucide-react';
import type { FieldErrors, UseFormRegister, Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import type { RegistrationFormData } from '../types';

type AddressFieldsProps = {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  control: Control<RegistrationFormData>;
};

const countries = [
  { code: 'RU', name: 'Russia' },
  { code: 'BY', name: 'Belarus' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'AM', name: 'Armenia' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'RS', name: 'Serbia' },
];

export function AddressFields({ register, errors, control }: AddressFieldsProps) {
  return (
    <>
      <h3 className="mt-6 text-lg font-medium">Address Information</h3>

      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <div className="relative">
          <Controller
            control={control}
            name="country"
            rules={{ required: 'Country is required' }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="country"
                  aria-invalid={!!errors.country}
                  className={cn('w-full', errors.country ? 'border-red-500' : '')}
                >
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <AlertCircle className="absolute top-1/2 right-8 h-4 w-4 -translate-y-1/2 text-red-500" />
          )}
        </div>
        {errors.country && (
          <p className="error-message text-sm text-red-500">{errors.country.message}</p>
        )}
      </div>

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

      <div className="grid gap-2">
        <Label htmlFor="city">City</Label>
        <div className="relative">
          <Input id="city" {...register('city')} aria-invalid={!!errors.city} />
          {errors.city && (
            <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
          )}
        </div>
        {errors.city && <p className="error-message text-sm text-red-500">{errors.city.message}</p>}
      </div>

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
    </>
  );
}
