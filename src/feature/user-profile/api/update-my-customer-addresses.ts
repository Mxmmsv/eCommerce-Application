import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';

export async function updateMyCustomerAddresses(
  customer: Customer,
  token: string,
  actions: MyCustomerUpdateAction[],
): Promise<Customer> {
  if (actions.length === 0) throw new Error('No update actions provided');

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
