import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { useAuthStore } from '@/service/store/use-auth-store';

import { fetchCart } from './api-fetch-cart';

export const updateItemQuantity = async (lineItemId: string, quantity: number): Promise<void> => {
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
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity,
            },
          ],
        },
      })
      .execute();

    setCart(response.body);
  } catch (error) {
    console.error('Update quantity error:', error);
    throw new Error('Failed to update item quantity');
  }
};
