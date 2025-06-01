import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';

export async function updateMyCustomer(
  customer: Customer,
  token: string,
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

  const apiRoot = createApiClientWithToken(token);

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
