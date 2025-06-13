import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { tokenCache } from '@/feature/api/api-token-store';
import { signInCustomer } from '@/feature/auth/login/api/sign-in-customer';
import { setAuthToLocalStorage } from '@/service/store/local-storage';

export async function updateMyCustomer(
  customer: Customer,
  updates: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
  },
): Promise<Customer> {
  const actions: MyCustomerUpdateAction[] = [];

  if (updates.firstName !== undefined) {
    actions.push({ action: 'setFirstName', firstName: updates.firstName });
  }
  if (updates.lastName !== undefined) {
    actions.push({ action: 'setLastName', lastName: updates.lastName });
  }
  if (updates.email !== undefined) {
    actions.push({ action: 'changeEmail', email: updates.email });
  }
  if (updates.dateOfBirth !== undefined) {
    actions.push({ action: 'setDateOfBirth', dateOfBirth: updates.dateOfBirth });
  }
  if (actions.length === 0) {
    throw new Error('No update actions provided');
  }

  const apiRoot = createApiClientWithToken();

  const response = await apiRoot
    .me()
    .post({
      body: {
        version: customer.version,
        actions,
      },
    })
    .execute();

  return response.body;
}

export async function changeCustomerPassword(
  version: number,
  currentPassword: string,
  newPassword: string,
  email: string,
): Promise<Customer> {
  const apiRoot = createApiClientWithToken();

  await apiRoot
    .me()
    .password()
    .post({
      body: {
        version,
        currentPassword,
        newPassword,
      },
    })
    .execute();

  const response = await signInCustomer(email, newPassword);

  const newToken = tokenCache.get().token;
  if (newToken) {
    setAuthToLocalStorage(newToken, true);
  }

  return response.body.customer;
}
