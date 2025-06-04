import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useCustomerStore } from '@/service/store/use-user-store';

export async function updateMyCustomerAddresses(
  customer: Customer,
  token: string | null,
  actions: MyCustomerUpdateAction[],
): Promise<Customer> {
  if (!customer) throw new Error('Customer not defined');
  if (!token) {
    const cachedToken = localStorage.getItem('ACCESS_TOKEN_KEY');
    if (!cachedToken) throw new Error('User token not found in cache');
    token = cachedToken;
  }
  if (actions.length === 0) throw new Error('No update actions provided');

  const apiRoot = createApiClientWithToken(token);
  const latestCustomerResponse = await apiRoot.me().get().execute();
  const latestCustomer = latestCustomerResponse.body;

  const response = await apiRoot
    .me()
    .post({
      body: {
        version: latestCustomer.version,
        actions,
      },
    })
    .execute();

  useCustomerStore.setState({ customer: response.body });

  return response.body;
}
