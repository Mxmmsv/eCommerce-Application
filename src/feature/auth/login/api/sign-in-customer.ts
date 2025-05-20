import type {
  ClientResponse,
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

import PasswordFlowApiClient from '@/feature/api/api-client-password-flow';
import tokenCache from '@/feature/api/api-token-store';
import { setAuthToLocalStorage } from '@/service/store/local-storage';
import { useCustomerStore } from '@/service/store/use-user-store';

export const signInCustomer = async (
  email: string,
  password: string,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const customerLogin: CustomerSignin = {
    email,
    password,
    anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    updateProductData: true,
  };

  const apiRoot = PasswordFlowApiClient(email, password);

  await apiRoot.get().execute();

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
    addresses: customer.addresses,
    isEmailVerified: customer.isEmailVerified,
    stores: customer.stores,
    authenticationMode: customer.authenticationMode,
  });

  return response;
};
