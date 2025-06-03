import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AddressesBilling from './addresses-billing';
import AddressesShipping from './addresses-shipping';

export default function AllCustomerAddress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Address Book</CardTitle>
        <CardDescription>
          Choose your shipping and billing addresses here. Save all your available addresses.
        </CardDescription>
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
