import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { FormData } from './types';

type AddressFieldsProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export function AddressFields({ register, errors }: AddressFieldsProps) {
  return (
    <>
      <h3 className="text-l mt-6 font-medium">Address Information</h3>

      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <Input id="country" {...register('country')} aria-invalid={!!errors.country} />
        {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="postalCode">Postal code</Label>
        <Input id="postalCode" {...register('postalCode')} aria-invalid={!!errors.postalCode} />
        {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" {...register('city')} aria-invalid={!!errors.city} />
        {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="street">Street</Label>
        <Input id="street" {...register('street')} aria-invalid={!!errors.street} />
        {errors.street && <p className="text-sm text-red-500">{errors.street.message}</p>}
      </div>
    </>
  );
}
