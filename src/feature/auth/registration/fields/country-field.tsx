import { AlertCircle } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

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

const countries = [
  { code: 'RU', name: 'Russia' },
  { code: 'BY', name: 'Belarus' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'AM', name: 'Armenia' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'RS', name: 'Serbia' },
];

export function CountryField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  return (
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
  );
}
