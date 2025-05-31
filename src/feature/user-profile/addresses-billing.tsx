import type { Address } from '@commercetools/platform-sdk';
import {
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  ReceiptText,
  SquarePen,
  Trash,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCustomerStore } from '@/service/store/use-user-store';

export default function AddressesBilling() {
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const customer = useCustomerStore((state) => state.customer);

  const billingAddresses =
    (customer?.billingAddressIds
      ?.map((id) => customer.addresses.find((addr) => addr.id === id))
      .filter(Boolean) as Address[]) ?? [];

  const defaultBillingAddress = customer?.defaultBillingAddressId
    ? customer.addresses.find((addr) => addr.id === customer.defaultBillingAddressId)
    : null;

  const [selectedDefaultId, setSelectedDefaultId] = useState<string | null>(
    customer?.defaultBillingAddressId ?? null,
  );

  return (
    <Collapsible
      className="w-full overflow-hidden rounded-md border"
      open={isBillingOpen}
      onOpenChange={setIsBillingOpen}
    >
      <div className="bg-muted/5 border-b">
        <CollapsibleTrigger className="hover:bg-muted/10 flex w-full items-center justify-between px-4 py-3 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
              <ReceiptText size={20} strokeWidth={1.25} className="text-primary h-4 w-4" />
            </div>
            <span className="font-medium">Billing addresses</span>
          </div>
          {isBillingOpen ? (
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
              <h3 className="text-foreground mb-3 font-medium">Default billing address</h3>
              <CircleCheckBig size={20} strokeWidth={1.25} className="text-primary h-4 w-4" />
            </div>

            {defaultBillingAddress ? (
              <>
                <div className="grid w-full grid-cols-2 gap-5 pb-4 pl-4 max-[450px]:grid-cols-1">
                  <div className="mb-3 flex flex-col space-y-2 uppercase">
                    <h4 className="underline">Address details</h4>
                    {(customer?.firstName || customer?.lastName) && (
                      <p>
                        {customer.firstName} {customer.lastName}
                      </p>
                    )}

                    {(defaultBillingAddress.streetNumber ||
                      defaultBillingAddress.streetName ||
                      defaultBillingAddress.building ||
                      defaultBillingAddress.apartment ||
                      defaultBillingAddress.pOBox) && (
                      <p>
                        {defaultBillingAddress.streetNumber &&
                          ` ${defaultBillingAddress.streetNumber} `}
                        {defaultBillingAddress.streetName}
                        {defaultBillingAddress.building && `, ${defaultBillingAddress.building}`}
                        {defaultBillingAddress.apartment && (
                          <>
                            , <span className="lowercase">apt.</span>
                            {defaultBillingAddress.apartment}
                          </>
                        )}
                        {defaultBillingAddress.pOBox && `, PO Box ${defaultBillingAddress.pOBox}`}
                      </p>
                    )}

                    {(defaultBillingAddress.city || defaultBillingAddress.postalCode) && (
                      <p>
                        {defaultBillingAddress.postalCode} {defaultBillingAddress.city}
                      </p>
                    )}

                    {(defaultBillingAddress.region || defaultBillingAddress.state) && (
                      <p>
                        {defaultBillingAddress.region}
                        {defaultBillingAddress.region && defaultBillingAddress.state ? ', ' : ''}
                        {defaultBillingAddress.state}
                      </p>
                    )}

                    {defaultBillingAddress.country && <p>{defaultBillingAddress.country}</p>}

                    {defaultBillingAddress.additionalStreetInfo && (
                      <p className="text-muted-foreground text-sm italic">
                        Street note: {defaultBillingAddress.additionalStreetInfo}
                      </p>
                    )}

                    {defaultBillingAddress.additionalAddressInfo && (
                      <p className="text-muted-foreground text-sm italic">
                        Address note: {defaultBillingAddress.additionalAddressInfo}
                      </p>
                    )}
                  </div>

                  <div className="mb-3 flex flex-col space-y-2 uppercase">
                    <h4 className="underline">Contact details</h4>
                    <div className="flex flex-col space-y-1">
                      {defaultBillingAddress.firstName ||
                      defaultBillingAddress.lastName ||
                      defaultBillingAddress.salutation ||
                      defaultBillingAddress.title ||
                      defaultBillingAddress.company ||
                      defaultBillingAddress.department ||
                      defaultBillingAddress.email ||
                      defaultBillingAddress.phone ||
                      defaultBillingAddress.mobile ||
                      defaultBillingAddress.fax ? (
                        <>
                          {(defaultBillingAddress.firstName || defaultBillingAddress.lastName) && (
                            <p>
                              {defaultBillingAddress.firstName} {defaultBillingAddress.lastName}
                            </p>
                          )}
                          {defaultBillingAddress.salutation && (
                            <p>Salutation: {defaultBillingAddress.salutation}</p>
                          )}
                          {defaultBillingAddress.title && (
                            <p>Title: {defaultBillingAddress.title}</p>
                          )}
                          {defaultBillingAddress.company && (
                            <p>Company: {defaultBillingAddress.company}</p>
                          )}
                          {defaultBillingAddress.department && (
                            <p>Department: {defaultBillingAddress.department}</p>
                          )}
                          {defaultBillingAddress.email && (
                            <p>Email: {defaultBillingAddress.email}</p>
                          )}
                          {defaultBillingAddress.phone && (
                            <p>Phone: {defaultBillingAddress.phone}</p>
                          )}
                          {defaultBillingAddress.mobile && (
                            <p>Mobile: {defaultBillingAddress.mobile}</p>
                          )}
                          {defaultBillingAddress.fax && <p>Fax: {defaultBillingAddress.fax}</p>}
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

            {billingAddresses.length === 0 ? (
              <p className="text-muted-foreground mb-5 text-sm italic">
                No billing addresses available.
              </p>
            ) : (
              <div className="mb-3 flex flex-col justify-between space-y-2">
                {billingAddresses.map((address) => (
                  <div key={address.id} className="mb-4 border-b pb-2 pl-4">
                    <div>
                      <div className="grid w-full grid-cols-2 gap-5 pb-4 max-[450px]:grid-cols-1">
                        <div className="flex flex-col">
                          <h4 className="mb-2 uppercase underline">Address details</h4>
                          <div className="flex space-x-2">
                            <p className="font-medium">
                              {customer?.firstName} {customer?.lastName}
                            </p>
                            {address.id === customer?.defaultBillingAddressId && (
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
                          id={`defaultBilling-${address.id}`}
                          checked={selectedDefaultId === address.id}
                          onCheckedChange={() => setSelectedDefaultId(address.id!)}
                        />
                        <label
                          htmlFor={`defaultBilling-${address.id}`}
                          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Set as default billing address
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
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
