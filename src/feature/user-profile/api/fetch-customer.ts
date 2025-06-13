import type { Customer } from '@commercetools/platform-sdk';
import useSWR from 'swr';

import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useCustomerStore } from '@/service/store/use-user-store';

const fetchCustomerWithToken =
  (apiRoot: ReturnType<typeof createApiClientWithToken>) => async (): Promise<Customer> => {
    const response = await apiRoot.me().get().execute();
    return response.body;
  };

export const useCustomerProfile = (accessToken: string | null) => {
  const { customer, setCustomer } = useCustomerStore();

  const apiRoot = accessToken ? createApiClientWithToken() : null;

  const { data, error, isLoading } = useSWR<Customer, Error>(
    apiRoot ? 'customer-profile' : null,
    fetchCustomerWithToken(apiRoot!),
  );

  if (data) setCustomer(data);

  return { customer, error, isLoading };
};
