import { AlertCircle } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
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

const countries = [
  { code: 'RU', name: 'Russia' },
  { code: 'BY', name: 'Belarus' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'AM', name: 'Armenia' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'RS', name: 'Serbia' },
];

export function AddressFields() {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  const watchSetAsShipping = watch('setAsDefaultShipping');
  const watchSetAsBilling = watch('setAsDefaultBilling');

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

      <div className="mt-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="setAsDefaultShipping"
            render={({ field }) => (
              <Checkbox
                id="setAsDefaultShipping"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked && watchSetAsShipping) {
                    setValue('setAsDefaultShipping', false);
                  }
                }}
              />
            )}
          />
          <label
            htmlFor="setAsDefaultShipping"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Set as default shipping address
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="setAsDefaultBilling"
            render={({ field }) => (
              <Checkbox
                id="setAsDefaultBilling"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked && watchSetAsBilling) {
                    setValue('setAsDefaultBilling', false);
                  }
                }}
              />
            )}
          />
          <label
            htmlFor="setAsDefaultBilling"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Set as default billing address
          </label>
        </div>
      </div>
    </>
  );
}
