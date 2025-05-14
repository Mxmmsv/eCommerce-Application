import type {
  ClientResponse,
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

import PasswordFlowApiClient from '@/feature/api/api-client-password-flow';
import tokenCache from '@/feature/api/api-token-store';
import { setTokenToLocalStorage } from '@/service/store/local-storage';

export const signInCustomerWithMail = async (
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

  setTokenToLocalStorage(token, true);

  return response;
};
