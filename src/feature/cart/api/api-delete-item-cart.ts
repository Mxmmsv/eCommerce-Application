import type { Cart } from '@commercetools/platform-sdk';

import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useAuthStore } from '@/service/store/use-auth-store';

export const removeItemFromCart = async (lineItemId: string): Promise<Cart> => {
  const { token } = useAuthStore.getState();

  const apiRoot = token ? createApiClientWithToken() : AnonymousFlowApiClient();

  try {
    const { body: cart } = await apiRoot.me().activeCart().get().execute();
    const { body: updatedCart } = await apiRoot
      .me()
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
    return updatedCart;
  } catch (error) {
    console.error('Error remove item from cart:', error);
    throw error;
  }
};
