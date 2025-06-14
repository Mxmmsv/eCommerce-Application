import { getApiClient } from '@/feature/api/api-client-utils';

import { fetchCart } from './api-fetch-cart';

export const removeItemFromCart = async (lineItemId: string): Promise<void> => {
  const apiRoot = getApiClient();
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
