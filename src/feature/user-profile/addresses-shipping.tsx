import type { Address } from '@commercetools/platform-sdk';
import {
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  Plus,
  SquarePen,
  Trash,
  Truck,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCustomerStore } from '@/service/store/use-user-store';

export default function AddressesShipping() {
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  const customer = useCustomerStore((state) => state.customer);

  const [selectedDefaultId, setSelectedDefaultId] = useState<string | null>(
    customer?.defaultShippingAddressId ?? null,
  );

  const shippingAddresses =
    (customer?.shippingAddressIds
      ?.map((id) => customer.addresses.find((addr) => addr.id === id))
      .filter(Boolean) as Address[]) ?? [];

  const defaultShippingAddress = customer?.defaultShippingAddressId
    ? customer.addresses.find((addr) => addr.id === customer.defaultShippingAddressId)
    : null;

  return (
    <Collapsible
      className="w-full overflow-hidden rounded-md border"
      open={isShippingOpen}
      onOpenChange={setIsShippingOpen}
    >
      <div className="bg-muted/5 border-b">
        <CollapsibleTrigger className="hover:bg-muted/10 flex w-full items-center justify-between px-4 py-3 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
              <Truck size={20} strokeWidth={1.25} className="text-primary h-4 w-4" />
            </div>
            <span className="font-medium">Shipping addresses</span>
          </div>
          {isShippingOpen ? (
            <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          )}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="text-muted-foreground px-4 py-3 text-sm">
          <div className="pb-2">
            <div className="flex space-x-2">
              <h3 className="text-foreground mb-3 font-medium">Default shipping address</h3>
              <CircleCheckBig size={20} strokeWidth={1.25} className="text-primary h-4 w-4" />
            </div>

            {defaultShippingAddress ? (
              <>
                <div className="grid w-full grid-cols-2 gap-5 pb-4 pl-4 max-[450px]:grid-cols-1">
                  <div className="mb-3 flex flex-col space-y-2 uppercase">
                    <h4 className="underline">Address details</h4>
                    {(customer?.firstName || customer?.lastName) && (
                      <p>
                        {customer.firstName} {customer.lastName}
                      </p>
                    )}

                    {(defaultShippingAddress.streetNumber ||
                      defaultShippingAddress.streetName ||
                      defaultShippingAddress.building ||
                      defaultShippingAddress.apartment ||
                      defaultShippingAddress.pOBox) && (
                      <p>
                        {defaultShippingAddress.streetNumber &&
                          ` ${defaultShippingAddress.streetNumber} `}
                        {defaultShippingAddress.streetName}
                        {defaultShippingAddress.building && `, ${defaultShippingAddress.building}`}
                        {defaultShippingAddress.apartment && (
                          <>
                            , <span className="lowercase">apt.</span>
                            {defaultShippingAddress.apartment}
                          </>
                        )}
                        {defaultShippingAddress.pOBox && `, PO Box ${defaultShippingAddress.pOBox}`}
                      </p>
                    )}

                    {(defaultShippingAddress.city || defaultShippingAddress.postalCode) && (
                      <p>
                        {defaultShippingAddress.postalCode} {defaultShippingAddress.city}
                      </p>
                    )}

                    {(defaultShippingAddress.region || defaultShippingAddress.state) && (
                      <p>
                        {defaultShippingAddress.region}
                        {defaultShippingAddress.region && defaultShippingAddress.state ? ', ' : ''}
                        {defaultShippingAddress.state}
                      </p>
                    )}

                    {defaultShippingAddress.country && <p>{defaultShippingAddress.country}</p>}

                    {defaultShippingAddress.additionalStreetInfo && (
                      <p className="text-muted-foreground text-sm italic">
                        Street note: {defaultShippingAddress.additionalStreetInfo}
                      </p>
                    )}

                    {defaultShippingAddress.additionalAddressInfo && (
                      <p className="text-muted-foreground text-sm italic">
                        Address note: {defaultShippingAddress.additionalAddressInfo}
                      </p>
                    )}
                  </div>

                  <div className="mb-3 flex flex-col space-y-2 uppercase">
                    <h4 className="underline">Contact details</h4>
                    <div className="flex flex-col space-y-1">
                      {defaultShippingAddress.firstName ||
                      defaultShippingAddress.lastName ||
                      defaultShippingAddress.salutation ||
                      defaultShippingAddress.title ||
                      defaultShippingAddress.company ||
                      defaultShippingAddress.department ||
                      defaultShippingAddress.email ||
                      defaultShippingAddress.phone ||
                      defaultShippingAddress.mobile ||
                      defaultShippingAddress.fax ? (
                        <>
                          {(defaultShippingAddress.firstName ||
                            defaultShippingAddress.lastName) && (
                            <p>
                              {defaultShippingAddress.firstName} {defaultShippingAddress.lastName}
                            </p>
                          )}
                          {defaultShippingAddress.salutation && (
                            <p>Salutation: {defaultShippingAddress.salutation}</p>
                          )}
                          {defaultShippingAddress.title && (
                            <p>Title: {defaultShippingAddress.title}</p>
                          )}
                          {defaultShippingAddress.company && (
                            <p>Company: {defaultShippingAddress.company}</p>
                          )}
                          {defaultShippingAddress.department && (
                            <p>Department: {defaultShippingAddress.department}</p>
                          )}
                          {defaultShippingAddress.email && (
                            <p>Email: {defaultShippingAddress.email}</p>
                          )}
                          {defaultShippingAddress.phone && (
                            <p>Phone: {defaultShippingAddress.phone}</p>
                          )}
                          {defaultShippingAddress.mobile && (
                            <p>Mobile: {defaultShippingAddress.mobile}</p>
                          )}
                          {defaultShippingAddress.fax && <p>Fax: {defaultShippingAddress.fax}</p>}
                        </>
                      ) : (
                        <p className="text-muted-foreground text-sm italic">
                          No contact details available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-1 flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <SquarePen size={20} strokeWidth={1.25} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash size={20} strokeWidth={1.25} />
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground mb-5 text-sm italic">
                You have no default addresses added yet.
              </p>
            )}
          </div>

          <div>
            <h4 className="text-foreground mb-3 border-t pt-2 font-medium">Additional addresses</h4>

            {shippingAddresses.length === 0 ? (
              <p className="text-muted-foreground mb-5 text-sm italic">
                No shipping addresses available.
              </p>
            ) : (
              <div className="mb-3 flex flex-col justify-between space-y-2">
                {shippingAddresses.map((address) => (
                  <div key={address.id} className="mb-4 border-b pb-2 pl-4">
                    <div>
                      <div className="grid w-full grid-cols-2 gap-5 pb-4 max-[450px]:grid-cols-1">
                        <div className="flex flex-col">
                          <h4 className="mb-2 uppercase underline">Address details</h4>
                          <div className="flex space-x-2">
                            <p className="font-medium">
                              {customer?.firstName} {customer?.lastName}
                            </p>
                            {address.id === customer?.defaultShippingAddressId && (
                              <CircleCheckBig
                                size={20}
                                strokeWidth={1.25}
                                className="text-primary h-4 w-4"
                              />
                            )}
                          </div>

                          {(address.streetName ||
                            address.streetNumber ||
                            address.building ||
                            address.apartment ||
                            address.pOBox) && (
                            <p>
                              {address.streetNumber && ` ${address.streetNumber} `}
                              {address.streetName}
                              {address.building && `, ${address.building}`}
                              {address.apartment && (
                                <>
                                  , <span className="lowercase">apt.</span>
                                  {address.apartment}
                                </>
                              )}
                              {address.pOBox && `, PO Box ${address.pOBox}`}
                            </p>
                          )}

                          {(address.city || address.postalCode) && (
                            <p>
                              {address.postalCode} {address.city}
                            </p>
                          )}

                          {(address.region || address.state) && (
                            <p>
                              {address.region}
                              {address.region && address.state ? ', ' : ''}
                              {address.state}
                            </p>
                          )}

                          {address.country && <p>{address.country}</p>}

                          {address.additionalStreetInfo && (
                            <p className="text-muted-foreground text-sm italic">
                              Street note: {address.additionalStreetInfo}
                            </p>
                          )}

                          {address.additionalAddressInfo && (
                            <p className="text-muted-foreground text-sm italic">
                              Address note: {address.additionalAddressInfo}
                            </p>
                          )}
                        </div>
                        <div className="mb-3 flex flex-col space-y-2">
                          <h4 className="mb-2 uppercase underline">Contact details</h4>
                          <div className="flex flex-col space-x-2">
                            {address.firstName ||
                            address.lastName ||
                            address.salutation ||
                            address.title ||
                            address.company ||
                            address.department ||
                            address.email ||
                            address.phone ||
                            address.mobile ||
                            address.fax ? (
                              <>
                                {(address.firstName || address.lastName) && (
                                  <p>
                                    {address.firstName} {address.lastName}
                                  </p>
                                )}
                                {address.salutation && <p>Salutation: {address.salutation}</p>}
                                {address.title && <p>Title: {address.title}</p>}
                                {address.company && <p>Company: {address.company}</p>}
                                {address.department && <p>Department: {address.department}</p>}
                                {address.email && <p>Email: {address.email}</p>}
                                {address.phone && <p>Phone: {address.phone}</p>}
                                {address.mobile && <p>Mobile: {address.mobile}</p>}
                                {address.fax && <p>Fax: {address.fax}</p>}
                              </>
                            ) : (
                              <p className="text-muted-foreground text-sm italic">
                                No contact details available.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`defaultShipping-${address.id}`}
                          checked={selectedDefaultId === address.id}
                          onCheckedChange={() => setSelectedDefaultId(address.id!)}
                        />
                        <label
                          htmlFor={`defaultShipping-${address.id}`}
                          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Set as default shipping address
                        </label>
                      </div>

                      <div className="mb-1 flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <SquarePen size={20} strokeWidth={1.25} />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash size={20} strokeWidth={1.25} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Button>
              <Plus /> Add address
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
