import type { Address } from '@commercetools/platform-sdk';
import { SquarePen, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { tokenCache } from '@/feature/api/api-token-store';
import { useCustomerStore } from '@/service/store/use-user-store';

import { removeAddress } from './customer-address-actions';
import { getAddresses } from './get-address';

type DefaultProps = {
  addresses: Address[];
  defaultShippingAddressId?: string | null;
  defaultBillingAddressId?: string | null;
};

type AllProps = {
  addresses: Address[];
  label: string;
};

function renderAddressContent(address: Address, label: string) {
  const customer = useCustomerStore.getState().customer;

  const handleDelete = async () => {
    if (!address.id || !customer) return;

    try {
      const token = tokenCache.get().token;
      await removeAddress(customer, token, address.id);
      toast.info('Address deleted');
    } catch (err) {
      console.error('Failed to delete address:', err);
    }
  };

  return (
    <div className="py-3 pb-2">
      <div>
        <h3 className="text-foreground mb-2 text-sm font-medium">{label}</h3>
        <p className="text-muted-foreground text-sm">
          {address.streetNumber} {address.streetName}
          {address.building && `, ${address.building}`}
          {address.apartment && (
            <>
              , <span className="lowercase">apt.</span> {address.apartment}
            </>
          )}
          <br />
          {address.pOBox && `PO Box: ${address.pOBox}`} <br />
          {address.city && `${address.city}, `}
          {address.region && `${address.region}${address.state ? ', ' : ''}${address.state}`} <br />
          {address.postalCode} {address.country}
          <br />
          {address.additionalStreetInfo && (
            <span className="text-muted-foreground text-sm italic">
              Additional street info: {address.additionalStreetInfo}
            </span>
          )}
          <br />
          {address.additionalAddressInfo && (
            <span className="text-muted-foreground text-sm italic">
              Additional address info: {address.additionalAddressInfo}
            </span>
          )}
        </p>
      </div>
      <div className="mt-2 flex justify-start gap-2">
        <Button variant="outline" size="icon">
          <SquarePen size={20} strokeWidth={1.25} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            void handleDelete();
          }}
        >
          <Trash size={20} strokeWidth={1.25} />
        </Button>
      </div>
    </div>
  );
}

export function AllAddressesDisplay({ addresses, label }: AllProps) {
  if (!addresses || addresses.length === 0) {
    return (
      <div className="py-3 pb-2">
        <h3 className="text-foreground mb-2 text-sm font-medium">{label}</h3>
        <p className="text-muted-foreground text-sm italic">You have no addresses added yet.</p>
      </div>
    );
  }

  return (
    <div className="px-5">
      {addresses.map((address, index) => (
        <div key={address.id ?? index} className="mb-4">
          {renderAddressContent(address, `Address №${index + 1}`)}

          <div className="mt-2 flex flex-col gap-2 border-b py-3 text-sm">
            <label
              htmlFor="billing"
              className="flex items-center gap-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Checkbox id="billing" /> Set as default billing address
            </label>
            <label
              htmlFor="shipping"
              className="flex items-center gap-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Checkbox id="shipping" /> Set as default shipping address
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DefaultAddressesDisplay({
  addresses,
  defaultShippingAddressId,
  defaultBillingAddressId,
}: DefaultProps) {
  if (!addresses || addresses.length === 0) {
    return <p className="text-muted-foreground px-5 text-sm italic">No customer data available.</p>;
  }

  const { defaultShippingAddress, defaultBillingAddress } = getAddresses({
    addresses,
    defaultShippingAddressId,
    defaultBillingAddressId,
  });

  function renderDefault(address: Address | null, label: string) {
    if (!address) {
      return (
        <div className="border-b py-3 pb-2">
          <h3 className="text-foreground mb-2 text-sm font-medium">{label}</h3>
          <p className="text-muted-foreground text-sm italic">You have no default address set.</p>
        </div>
      );
    }

    return renderAddressContent(address, label);
  }

  return (
    <div className="px-5">
      {renderDefault(defaultShippingAddress, 'Default Shipping Address')}
      {renderDefault(defaultBillingAddress, 'Default Billing Address')}
    </div>
  );
}
