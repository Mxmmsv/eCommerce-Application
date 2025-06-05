import type { Customer } from '@commercetools/platform-sdk';

import { updateMyCustomerAddresses } from '../api/update-my-customer-addresses';

export async function updateBillingAddress(
  customer: Customer,
  token: string,
  addressId: string,
  isChecked: boolean,
) {
  const action = isChecked ? 'addBillingAddressId' : 'removeBillingAddressId';
  await updateMyCustomerAddresses(customer, token, [{ action, addressId }]);
  console.log(`${isChecked ? 'Added' : 'Removed'} Billing Address ID:`, addressId);
}

export async function updateShippingAddress(
  customer: Customer,
  token: string,
  addressId: string,
  isChecked: boolean,
) {
  const action = isChecked ? 'addShippingAddressId' : 'removeShippingAddressId';
  await updateMyCustomerAddresses(customer, token, [{ action, addressId }]);
  console.log(`${isChecked ? 'Added' : 'Removed'} Shipping Address ID:`, addressId);
}

export async function updateDefaultBillingAddress(
  customer: Customer,
  token: string,
  addressId: string,
  isChecked: boolean,
) {
  if (isChecked) {
    await updateMyCustomerAddresses(customer, token, [
      { action: 'setDefaultBillingAddress', addressId },
    ]);
    console.log('Default Billing Address Set:', addressId);
  }
}

export async function updateDefaultShippingAddress(
  customer: Customer,
  token: string,
  addressId: string,
  isChecked: boolean,
) {
  if (isChecked) {
    await updateMyCustomerAddresses(customer, token, [
      { action: 'setDefaultShippingAddress', addressId },
    ]);
    console.log('Default Shipping Address Set:', addressId);
  }
}
