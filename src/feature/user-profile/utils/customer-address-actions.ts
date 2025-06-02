import type { AddressDraft, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import { updateMyCustomerAddresses } from '../api/update-my-customer-addresses';

export function addAddress(customer: Customer, token: string, address: AddressDraft) {
  const actions: MyCustomerUpdateAction[] = [{ action: 'addAddress', address }];
  return updateMyCustomerAddresses(customer, token, actions);
}

export function changeAddress(
  customer: Customer,
  token: string,
  addressId: string,
  newAddress: AddressDraft,
) {
  const actions: MyCustomerUpdateAction[] = [
    { action: 'changeAddress', addressId, address: newAddress },
  ];
  return updateMyCustomerAddresses(customer, token, actions);
}

export function removeAddress(customer: Customer, token: string, addressId: string) {
  const actions: MyCustomerUpdateAction[] = [{ action: 'removeAddress', addressId }];
  return updateMyCustomerAddresses(customer, token, actions);
}

export function setDefaultShippingAddress(customer: Customer, token: string, addressId: string) {
  const actions: MyCustomerUpdateAction[] = [{ action: 'setDefaultShippingAddress', addressId }];
  return updateMyCustomerAddresses(customer, token, actions);
}

export function setDefaultBillingAddress(customer: Customer, token: string, addressId: string) {
  const actions: MyCustomerUpdateAction[] = [{ action: 'setDefaultBillingAddress', addressId }];
  return updateMyCustomerAddresses(customer, token, actions);
}

export function addShippingAddressId(customer: Customer, token: string, addressId: string) {
  const actions: MyCustomerUpdateAction[] = [{ action: 'addShippingAddressId', addressId }];
  return updateMyCustomerAddresses(customer, token, actions);
}

export function removeShippingAddressId(customer: Customer, token: string, addressId: string) {
  const actions: MyCustomerUpdateAction[] = [{ action: 'removeShippingAddressId', addressId }];
  return updateMyCustomerAddresses(customer, token, actions);
}

export function addBillingAddressId(customer: Customer, token: string, addressId: string) {
  const actions: MyCustomerUpdateAction[] = [{ action: 'addBillingAddressId', addressId }];
  return updateMyCustomerAddresses(customer, token, actions);
}

export function removeBillingAddressId(customer: Customer, token: string, addressId: string) {
  const actions: MyCustomerUpdateAction[] = [{ action: 'removeBillingAddressId', addressId }];
  return updateMyCustomerAddresses(customer, token, actions);
}
