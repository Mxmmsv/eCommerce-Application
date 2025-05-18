import { useFormContext, Controller } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';

import type { RegistrationFormData } from '../types';

export function AddressOptions() {
  const { control, watch } = useFormContext<RegistrationFormData>();
  const [defaultShipping, defaultBilling] = watch(['setAsDefaultShipping', 'setAsDefaultBilling']);

  return (
    <div className="mt-4 space-y-3">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="setAsDefaultShipping"
            defaultValue={true}
            render={({ field }) => (
              <Checkbox
                id="setAsDefaultShipping"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                }}
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
          <div className="ml-6 space-y-2">
            <p className="text-muted-foreground text-sm">Add alternative shipping address:</p>
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
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                }}
              />
            )}
          />
          <label
            htmlFor="setAsDefaultBilling"
            className={`cursor-pointer text-sm leading-none font-medium`}
          >
            Set as default billing address
          </label>
        </div>
        {!defaultBilling && (
          <div className="ml-6 space-y-2">
            <p className="text-muted-foreground text-sm">Add alternative billing address:</p>
          </div>
        )}
      </div>
    </div>
  );
}
