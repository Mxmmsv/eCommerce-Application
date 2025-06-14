import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useAuthStore } from '@/service/store/use-auth-store';

import { fetchCart } from './api-fetch-cart';

export const removeItemFromCart = async (lineItemId: string): Promise<void> => {
  const { token } = useAuthStore.getState();
  const apiRoot = token ? createApiClientWithToken() : AnonymousFlowApiClient();
  const cart = await fetchCart();

  try {
    await apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
            },
          ],
        },
      })
      .execute();
  } catch (error) {
    console.error('Remove item error:', error);
    throw new Error('Failed to remove item from cart');
  }
};
