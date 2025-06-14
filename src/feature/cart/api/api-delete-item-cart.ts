import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { useAuthStore } from '@/service/store/use-auth-store';

import { fetchCart } from './api-fetch-cart';

export const removeItemFromCart = async (lineItemId: string): Promise<void> => {
  const { token } = useAuthStore.getState();
  const { setCart } = useCartStore.getState();
  const apiRoot = token ? createApiClientWithToken() : AnonymousFlowApiClient();
  const cart = await fetchCart();

  try {
    const response = await apiRoot
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
    setCart(response.body);
  } catch (error) {
    console.error('Remove item error:', error);
    throw new Error('Failed to remove item from cart');
  }
};
