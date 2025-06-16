import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useAuthStore } from '@/service/store/use-auth-store';

export const fetchShippingMethods = async () => {
  const { token } = useAuthStore.getState();
  const apiRoot = token ? createApiClientWithToken() : AnonymousFlowApiClient();

  const response = await apiRoot.shippingMethods().get().execute();
  const apiMethods = response.body.results.map((method) => ({
    id: method.id,
    name: method.name,
    price: method.zoneRates?.[0]?.shippingRates?.[0]?.price?.centAmount / 100 || 0,
    estimatedDays: '3-5 days',
  }));

  return [
    {
      id: 'no-shipping',
      name: 'No shipping (Pickup)',
      price: 0,
      estimatedDays: 'Pickup in store',
    },
    ...apiMethods,
  ];
};
