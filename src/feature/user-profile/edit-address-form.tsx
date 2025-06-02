import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
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

export default function AddAddressDialog({ trigger }: { trigger: ReactNode }) {
  type AddressFormData = {
    streetNumber?: string;
    streetName: string;
    building?: string;
    apartment?: string;
    poBox?: string;
    city?: string;
    postalCode?: string;
    region?: string;
    state?: string;
    country?: string;
    streetInfo?: string;
    addressInfo?: string;
    setAsShippingAddress?: boolean;
    setAsBillingAddress?: boolean;
    setAsDefaultShippingAddress?: boolean;
    setAsDefaultBillingAddress?: boolean;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    mode: 'onBlur',
  });

  const onSubmit = (data: AddressFormData): void => {
    console.log('Form submitted with data: ' + JSON.stringify(data, null, 2));
    reset();
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

        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <div className="flex flex-col max-md:gap-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="street-number">
                    Street number
                  </Label>
                  <Input type="number" id="street-number" placeholder="Enter street number" />
                </div>
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="street-name">
                    Street name*
                  </Label>
                  <Input
                    id="street-name"
                    placeholder="Enter street"
                    {...register('streetName', {
                      required: 'Street name is required',
                      minLength: {
                        value: 1,
                        message: 'Street name must be at least 1 character long',
                      },
                    })}
                  />
                  <div>
                    {errors?.streetName?.message && (
                      <p style={{ color: 'red', fontSize: '0.9rem' }}>
                        {errors?.streetName.message || 'Error!'}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="building">
                    Building
                  </Label>
                  <Input id="building" placeholder="Enter building number" />
                </div>
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="apartment">
                    Apartment / Suite
                  </Label>
                  <Input id="apartment" placeholder="Enter apartment number" />
                </div>
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="po-box">
                    PO Box
                  </Label>
                  <Input id="po-box" placeholder="Enter PO Box" />
                </div>
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="city">
                    City*
                  </Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    {...register('city', {
                      required: 'City name is required',
                      minLength: {
                        value: 1,
                        message: 'City name must be at least 1 character long',
                      },
                    })}
                  />
                  <div>
                    {errors?.city?.message && (
                      <p style={{ color: 'red', fontSize: '0.9rem' }}>
                        {errors?.city.message || 'Error!'}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="postal-code">
                    Postal Code*
                  </Label>
                  <Input
                    id="postal-code"
                    placeholder="Enter postal code"
                    {...register('postalCode', {
                      required: 'Postal code is required',
                      minLength: {
                        value: 2,
                        message: 'Postal code must be at least 2 character long',
                      },
                    })}
                  />
                  <div>
                    {errors?.postalCode?.message && (
                      <p style={{ color: 'red', fontSize: '0.9rem' }}>
                        {errors?.postalCode.message || 'Error!'}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="region">
                    Region
                  </Label>
                  <Input id="region" placeholder="Enter region" />
                </div>
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="state">
                    State/Province
                  </Label>
                  <Input id="state" placeholder="Enter state/province" />
                </div>
                <div className="col-span-1">
                  <Label className="pb-2" htmlFor="country">
                    Country*
                  </Label>
                  <Input
                    id="country"
                    placeholder="Enter country"
                    {...register('country', {
                      required: 'Country is required',
                      minLength: {
                        value: 2,
                        message: 'Country must be at least 2 characters long',
                      },
                    })}
                  />
                  <div>
                    {errors?.country?.message && (
                      <p style={{ color: 'red', fontSize: '0.9rem' }}>
                        {errors?.country.message || 'Error!'}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="street-info" className="pb-2">
                    Additional street info
                  </Label>
                  <Textarea id="street-info" placeholder="Enter additional street info" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address-info" className="pb-2">
                    Additional address info
                  </Label>
                  <Textarea id="address-info" placeholder="Enter address street info" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="italic">You can choose a type for your new address*</p>
              <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Set as shipping address</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Set as billing address</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Set as default shipping address</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Set as default billing address</Label>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="max-sm:gap-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" className="max-sm:mt-5">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
