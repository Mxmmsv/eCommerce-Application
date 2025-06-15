import type {
  AddressDraft,
  Customer,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

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
import { getAuthFromLocalStorage } from '@/service/store/local-storage';
import { useCustomerStore } from '@/service/store/use-user-store';

import { updateMyCustomerAddresses } from './api/update-my-customer-addresses';
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
  register: ReturnType<typeof useForm<AddressFormData>>['register'];
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

const TextareaField = ({
  id,
  label,
  register,
  placeholder,
}: {
  id: keyof AddressFormData;
  label: string;
  register: FieldProps['register'];
  placeholder?: string;
}) => (
  <div className="col-span-2">
    <Label className="pb-2" htmlFor={id}>
      {label}
    </Label>
    <Textarea id={id} placeholder={placeholder} {...register(id)} />
  </div>
);

const allowedCodes = ['RU', 'RS', 'UZ', 'KZ', 'BY', 'AM'];

export default function AddAddressDialog({ trigger }: { trigger: ReactNode }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    mode: 'onBlur',
    defaultValues: {},
    criteriaMode: 'all',
  });

  const [isOpen, setIsOpen] = useState(false);

  const customer = useCustomerStore((state) => state.customer);
  const token = getAuthFromLocalStorage().ACCESS_TOKEN_KEY;

  const onSubmit = async (data: AddressFormData) => {
    if (!customer || !token) {
      console.error('User is not authenticated');
      return;
    }

    const addressDraft: AddressDraft = {
      streetName: data.streetName,
      streetNumber: data.streetNumber,
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
      const updatedCustomer: Customer = await addAddress(customer, token, addressDraft);
      const newAddressId: string | undefined = updatedCustomer.addresses.at(-1)?.id;

      if (!newAddressId) {
        console.error('New address ID is undefined.');
        return;
      }

      const actions: MyCustomerUpdateAction[] = [];

      if (data.setAsShippingAddress) {
        actions.push({
          action: 'addShippingAddressId',
          addressId: newAddressId,
        } as MyCustomerAddShippingAddressIdAction);
      }
      if (data.setAsBillingAddress) {
        actions.push({
          action: 'addBillingAddressId',
          addressId: newAddressId,
        } as MyCustomerAddBillingAddressIdAction);
      }
      if (data.setAsDefaultShippingAddress) {
        actions.push({
          action: 'setDefaultShippingAddress',
          addressId: newAddressId,
        } as MyCustomerSetDefaultShippingAddressAction);
      }
      if (data.setAsDefaultBillingAddress) {
        actions.push({
          action: 'setDefaultBillingAddress',
          addressId: newAddressId,
        } as MyCustomerSetDefaultBillingAddressAction);
      }
      await updateMyCustomerAddresses(customer, token, actions);
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Error adding/updating address:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

              <Controller
                control={control}
                name="setAsShippingAddress"
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="shipping"
                      checked={field.value}
                      onCheckedChange={(val) => field.onChange(val)}
                    />
                    <Label htmlFor="shipping">Set as shipping address</Label>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="setAsBillingAddress"
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="billing"
                      checked={field.value}
                      onCheckedChange={(val) => field.onChange(val)}
                    />
                    <Label htmlFor="billing">Set as billing address</Label>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="setAsDefaultShippingAddress"
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="defaultShipping"
                      checked={field.value}
                      onCheckedChange={(val) => field.onChange(val)}
                    />
                    <Label htmlFor="defaultShipping">Set as default shipping address</Label>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="setAsDefaultBillingAddress"
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="defaultBilling"
                      checked={field.value}
                      onCheckedChange={(val) => field.onChange(val)}
                    />
                    <Label htmlFor="defaultBilling">Set as default billing address</Label>
                  </div>
                )}
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
