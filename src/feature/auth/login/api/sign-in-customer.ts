import type {
  ClientResponse,
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

import PasswordFlowApiClient from '@/feature/api/api-client-password-flow';
import { tokenCache, clearTokenCache } from '@/feature/api/api-token-store';
// import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { setAuthToLocalStorage } from '@/service/store/local-storage';
import { useCustomerStore } from '@/service/store/use-user-store';

export const signInCustomer = async (
  email: string,
  password: string,
): Promise<ClientResponse<CustomerSignInResult>> => {
  clearTokenCache();
  // const { anonymousId } = useCartStore.getState().cart.createdBy.anonymousId;
  const customerLogin: CustomerSignin = {
    email,
    password,
    anonymousCartSignInMode: 'UseAsNewActiveCustomerCart',
    // anonymousCartId: anonymousId,
  };

  const apiRoot = PasswordFlowApiClient(email, password);

  const response = await apiRoot
    .me()
    .login()
    .post({
      body: customerLogin,
    })
    .execute();

  const token = tokenCache.get().token;

  if (!token) {
    throw new Error('Authentication token not received');
  }

  setAuthToLocalStorage(token, true);

  const { customer } = response.body;

  useCustomerStore.getState().setCustomer({
    id: customer.id,
    version: customer.version,
    createdAt: customer.createdAt,
    lastModifiedAt: customer.lastModifiedAt,
    email: customer.email,
    firstName: customer.firstName ?? '',
    lastName: customer.lastName ?? '',
    dateOfBirth: customer.dateOfBirth ?? '',
    isEmailVerified: customer.isEmailVerified,
    stores: customer.stores,
    authenticationMode: customer.authenticationMode,
    addresses: customer.addresses,
    defaultShippingAddressId: customer.defaultShippingAddressId,
    defaultBillingAddressId: customer.defaultBillingAddressId,
    shippingAddressIds: customer.shippingAddressIds ?? [],
    billingAddressIds: customer.billingAddressIds ?? [],
  });

  return response;
};
