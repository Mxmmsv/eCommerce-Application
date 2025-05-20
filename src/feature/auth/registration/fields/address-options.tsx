import { useEffect, useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';

import type { RegistrationFormData } from '../types';

import { CityField } from './city-field';
import { CountryField } from './country-field';
import { PostalCodeField } from './postal-code-field';
import { StreetField } from './street-field';

export function AddressOptions() {
  const { control, watch, setValue } = useFormContext<RegistrationFormData>();
  const prevValues = useRef({
    shipping: true,
    billing: true,
  });

  const [defaultShipping, defaultBilling, skipDefaults] = watch([
    'setAsDefaultShipping',
    'setAsDefaultBilling',
    'skipDefaultAddresses',
  ]);

  useEffect(() => {
    if (skipDefaults) {
      prevValues.current = {
        shipping: defaultShipping,
        billing: defaultBilling,
      };
      setValue('setAsDefaultShipping', false);
      setValue('setAsDefaultBilling', false);
    } else {
      setValue('setAsDefaultShipping', prevValues.current.shipping);
      setValue('setAsDefaultBilling', prevValues.current.billing);
    }
  }, [skipDefaults]);

  return (
    <div className="mt-4 space-y-3">
      <div className="mb-8 space-y-2">
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="skipDefaultAddresses"
            render={({ field }) => (
              <Checkbox
                id="skipDefaultAddresses"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked) {
                    setValue('setAsDefaultShipping', false);
                    setValue('setAsDefaultBilling', false);
                  }
                }}
              />
            )}
          />
          <label
            htmlFor="skipDefaultAddresses"
            className={`cursor-pointer text-sm leading-none font-medium`}
          >
            Do not use by default for shipping / billing
          </label>
        </div>
      </div>

      {!skipDefaults && (
        <>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="setAsDefaultShipping"
                render={({ field }) => (
                  <Checkbox
                    id="setAsDefaultShipping"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <label
                htmlFor="setAsDefaultShipping"
                className="cursor-pointer text-sm leading-none font-medium"
              >
                Set as default shipping address
              </label>
            </div>
            {!defaultShipping && (
              <div className="ml-6 space-y-4 rounded-lg border p-4">
                <h4 className="flex items-center gap-2 font-medium">
                  Alternative Shipping Address
                </h4>
                <CountryField prefix="alternativeShipping" />
                <PostalCodeField prefix="alternativeShipping" />
                <CityField prefix="alternativeShipping" />
                <StreetField prefix="alternativeShipping" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="setAsDefaultBilling"
                render={({ field }) => (
                  <Checkbox
                    id="setAsDefaultBilling"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <label
                htmlFor="setAsDefaultBilling"
                className="cursor-pointer text-sm leading-none font-medium"
              >
                Set as default billing address
              </label>
            </div>
            {!defaultBilling && (
              <div className="ml-6 space-y-4 rounded-lg border p-4">
                <h4 className="flex items-center gap-2 font-medium">Alternative Billing Address</h4>
                <CountryField prefix="alternativeBilling" />
                <PostalCodeField prefix="alternativeBilling" />
                <CityField prefix="alternativeBilling" />
                <StreetField prefix="alternativeBilling" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
