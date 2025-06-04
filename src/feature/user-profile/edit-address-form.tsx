import type { AddressDraft } from '@commercetools/platform-sdk';
import type { ReactNode } from 'react';
import { useForm, type UseFormRegister } from 'react-hook-form';

import '@/styles/index.css';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/service/store/use-auth-store';
import { useCustomerStore } from '@/service/store/use-user-store';

import { addAddress } from './utils/customer-address-actions';

type AddressFormData = {
  streetNumber?: string;
  streetName: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  city: string;
  postalCode: string;
  region?: string;
  state?: string;
  country: string;
  streetInfo?: string;
  addressInfo?: string;
  setAsShippingAddress?: boolean;
  setAsBillingAddress?: boolean;
  setAsDefaultShippingAddress?: boolean;
  setAsDefaultBillingAddress?: boolean;
};

type FieldProps = {
  register: UseFormRegister<AddressFormData>;
};

type InputFieldProps = FieldProps & {
  id: keyof AddressFormData;
  label: string;
  required?: boolean | string;
  error?: string;
  type?: string;
  placeholder?: string;
};

const InputField = ({
  id,
  label,
  register,
  required,
  error,
  type = 'text',
  placeholder,
}: InputFieldProps) => (
  <div className="col-span-1">
    <Label className="pb-2" htmlFor={id}>
      {label}
    </Label>
    <Input
      id={id}
      placeholder={placeholder}
      type={type}
      {...register(id, required ? { required } : {})}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

type TextareaFieldProps = FieldProps & {
  id: keyof AddressFormData;
  label: string;
  placeholder?: string;
};

const TextareaField = ({ id, label, register, placeholder }: TextareaFieldProps) => (
  <div className="col-span-2">
    <Label className="pb-2" htmlFor={id}>
      {label}
    </Label>
    <Textarea id={id} placeholder={placeholder} {...register(id)} />
  </div>
);

type CheckboxFieldProps = FieldProps & {
  id: keyof AddressFormData;
  label: string;
};

const CheckboxField = ({ id, label, register }: CheckboxFieldProps) => (
  <div className="flex items-center gap-3">
    <Checkbox id={id} {...register(id)} />
    <Label htmlFor={id}>{label}</Label>
  </div>
);

const allowedCodes = ['RU', 'RS', 'UZ', 'KZ', 'BY', 'AM'];

export default function AddAddressDialog({ trigger }: { trigger: ReactNode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({ mode: 'onBlur', defaultValues: {}, criteriaMode: 'all' });

  const customer = useCustomerStore((state) => state.customer);
  const token = useAuthStore((state) => state.token);

  const onSubmit = async (data: AddressFormData) => {
    if (!customer || !token) {
      alert('User is not authenticated');
      return;
    }

    const newAddress: AddressDraft = {
      streetNumber: data.streetNumber,
      streetName: data.streetName,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      building: data.building,
      apartment: data.apartment,
      pOBox: data.pOBox,
      region: data.region,
      state: data.state,
      additionalStreetInfo: data.streetInfo,
      additionalAddressInfo: data.addressInfo,
    };

    try {
      const addedCustomer = await addAddress(customer, token, newAddress);
      const newAddressId = addedCustomer.addresses.at(-1)?.id;

      if (!newAddressId) {
        console.error('New address ID is undefined, skipping status update.');
        return;
      }
      reset();
      alert('Address added successfully!');
    } catch (error) {
      console.error('Add address error:', error);
      alert(`Failed to add address: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <Dialog>
      {trigger}
      <DialogContent className="flex max-h-[95vh] max-w-[70vw] flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add new address here</DialogTitle>
          <DialogDescription>
            Required fields are marked *. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <div className="flex flex-col max-md:gap-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                id="streetNumber"
                label="Street number"
                type="number"
                register={register}
                placeholder="Enter street number"
              />
              <InputField
                id="streetName"
                label="Street name*"
                register={register}
                required="Street name is required"
                error={errors.streetName?.message}
                placeholder="Enter street name"
              />
              <InputField
                id="building"
                label="Building"
                register={register}
                placeholder="Enter building number"
              />
              <InputField
                id="apartment"
                label="Apartment / Suite"
                register={register}
                placeholder="Enter apartment number"
              />
              <InputField
                id="pOBox"
                label="PO Box"
                register={register}
                placeholder="Enter PO Box"
              />
              <InputField
                id="city"
                label="City*"
                register={register}
                required="City is required"
                error={errors.city?.message}
                placeholder="Enter city"
              />
              <InputField
                id="postalCode"
                label="Postal Code*"
                register={register}
                required="Postal code is required"
                error={errors.postalCode?.message}
                placeholder="Enter postal code"
              />
              <InputField
                id="region"
                label="Region"
                register={register}
                placeholder="Enter region"
              />
              <InputField
                id="state"
                label="State/Province"
                register={register}
                placeholder="Enter state"
              />
              <InputField
                id="country"
                label="Country*"
                type="text"
                register={register}
                required={false}
                {...register('country', {
                  required: 'Country is required.',
                  validate: (value: unknown) => {
                    if (typeof value !== 'string') return 'Invalid input type';
                    if (value !== value.toUpperCase()) return 'Country code must be uppercase';
                    return (
                      allowedCodes.includes(value.toUpperCase()) ||
                      'Invalid country code. Allowed country codes are: ' + allowedCodes.join(', ')
                    );
                  },
                })}
                error={errors.country?.message}
                placeholder="RU, RS, UZ, KZ, BY or AM"
              />
              <TextareaField
                id="streetInfo"
                label="Additional street info"
                register={register}
                placeholder="Enter additional street info"
              />
              <TextareaField
                id="addressInfo"
                label="Additional address info"
                register={register}
                placeholder="Enter additional address info"
              />
            </div>

            <div className="space-y-3 pt-4">
              <p className="italic">You can choose a type for your new address</p>
              <CheckboxField
                id="setAsShippingAddress"
                label="Set as shipping address"
                register={register}
              />
              <CheckboxField
                id="setAsBillingAddress"
                label="Set as billing address"
                register={register}
              />
              <CheckboxField
                id="setAsDefaultShippingAddress"
                label="Set as default shipping address"
                register={register}
              />
              <CheckboxField
                id="setAsDefaultBillingAddress"
                label="Set as default billing address"
                register={register}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 max-sm:gap-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="max-sm:mt-5">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
