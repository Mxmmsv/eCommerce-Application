import type { Address } from '@commercetools/platform-sdk';

export type AddressesResult = {
  allAddresses: Address[];
  defaultShippingAddress: Address | null;
  defaultBillingAddress: Address | null;
};

export function getAddresses(customer: {
  addresses: Address[];
  defaultShippingAddressId?: string | null;
  defaultBillingAddressId?: string | null;
}): AddressesResult {
  if (!customer) {
    return {
      allAddresses: [],
      defaultShippingAddress: null,
      defaultBillingAddress: null,
    };
  }

  const allAddresses = customer.addresses ?? [];

  const defaultShippingAddress = customer.defaultShippingAddressId
    ? (allAddresses.find((addr) => addr.id === customer.defaultShippingAddressId) ?? null)
    : null;

  const defaultBillingAddress = customer.defaultBillingAddressId
    ? (allAddresses.find((addr) => addr.id === customer.defaultBillingAddressId) ?? null)
    : null;

  return {
    allAddresses,
    defaultShippingAddress,
    defaultBillingAddress,
  };
}
