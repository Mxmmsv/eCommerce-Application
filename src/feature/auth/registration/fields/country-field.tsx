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

type CountryFieldProps = {
  prefix?: 'alternativeShipping' | 'alternativeBilling';
};

export function CountryField({ prefix }: CountryFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  const fieldName: keyof RegistrationFormData = prefix ? `${prefix}Country` : 'country';
  const error = errors[fieldName as keyof typeof errors];

  return (
    <div className="grid gap-2">
      <Label htmlFor={fieldName}>{prefix ? 'Alternative Country' : 'Country'}</Label>
      <div className="relative">
        <Controller
          control={control}
          name={fieldName}
          rules={{ required: 'Country is required' }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id={fieldName}
                aria-invalid={!!error}
                className={cn('w-full', error ? 'border-red-500' : '')}
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
        {error && (
          <AlertCircle className="absolute top-1/2 right-8 h-4 w-4 -translate-y-1/2 text-red-500" />
        )}
      </div>
      {error && <p className="error-message text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
