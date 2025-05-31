import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogTrigger } from '@/components/ui/dialog';

import AddAddressDialog from './add-address-dialog';
import AddressesBilling from './addresses-billing';
import AddressesShipping from './addresses-shipping';

export default function AllCustomerAddress() {
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
        <div className="w-full">
          <AddressesShipping />
        </div>
        <div className="w-full">
          <AddressesBilling />
        </div>
      </CardContent>
    </Card>
  );
}
