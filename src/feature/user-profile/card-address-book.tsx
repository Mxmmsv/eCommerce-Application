import { MapPinHouse, NotebookTabs, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogTrigger } from '@/components/ui/dialog';
import { useCustomerStore } from '@/service/store/use-user-store';

import AddAddressDialog from './edit-address-form';
import { DefaultAddressesDisplay, AllAddressesDisplay } from './utils/addresses-render';
import CollapsibleSection from './utils/collapsible-section';
import { getAddresses } from './utils/get-address';

export default function AllCustomerAddress() {
  const customer = useCustomerStore((state) => state.customer);
  const addressesData = getAddresses(customer ?? { addresses: [] });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Address Book</CardTitle>
        <CardDescription className="my-3">
          Choose your shipping and billing addresses here. Edit all your available addresses or add
          a new ones.
        </CardDescription>
        <AddAddressDialog
          trigger={
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Add address
              </Button>
            </DialogTrigger>
          }
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CollapsibleSection
          title="Default addresses"
          icon={<MapPinHouse className="text-primary h-4 w-4" />}
        >
          <DefaultAddressesDisplay
            addresses={addressesData.allAddresses}
            defaultShippingAddressId={customer?.defaultShippingAddressId ?? null}
            defaultBillingAddressId={customer?.defaultBillingAddressId ?? null}
          />
        </CollapsibleSection>
        <CollapsibleSection
          title="All available addresses"
          icon={<NotebookTabs className="text-primary h-4 w-4" />}
        >
          <AllAddressesDisplay addresses={addressesData.allAddresses} label="Your Addresses" />
        </CollapsibleSection>
      </CardContent>
    </Card>
  );
}
