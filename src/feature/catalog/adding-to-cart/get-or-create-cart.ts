import type { Cart } from '@commercetools/platform-sdk';

import apiClientAnonymous from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';

import { useCartStore } from './use-cart-store';

export async function getOrCreateCart(
  isAuthenticated: boolean,
  token: string | null,
): Promise<Cart> {
  const { cart, setCart } = useCartStore.getState();

  const apiClient = isAuthenticated && token ? createApiClientWithToken() : apiClientAnonymous;

  const resolvedApiClient = typeof apiClient === 'function' ? apiClient() : apiClient;

  if (isAuthenticated) {
    const response = await resolvedApiClient.me().carts().get().execute();
    const meCarts = response.body.results;

    if (meCarts.length === 0) {
      const createResponse = await resolvedApiClient
        .me()
        .carts()
        .post({
          body: { currency: 'EUR' },
        })
        .execute();
      setCart(createResponse.body);
      return createResponse.body;
    }

    setCart(meCarts[0]);
    return meCarts[0];
  } else {
    if (!cart?.id) {
      const createResponse = await resolvedApiClient
        .carts()
        .post({
          body: { currency: 'EUR' },
        })
        .execute();
      setCart(createResponse.body);
      return createResponse.body;
    }

    const response = await resolvedApiClient.carts().withId({ ID: cart.id }).get().execute();
    setCart(response.body);
    return response.body;
  }
}
