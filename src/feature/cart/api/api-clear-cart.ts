import type { Cart } from '@commercetools/platform-sdk';

import { getApiClient } from '@/feature/api/api-client-utils';
import { fetchCart } from '@/feature/cart/api/api-fetch-cart';

export const clearCart = async (): Promise<Cart> => {
  const apiRoot = getApiClient();

  try {
    const currentCart = await fetchCart();

    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: currentCart.id })
      .delete({
        queryArgs: {
          version: currentCart.version,
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    console.error('Error emptying cart:', error);
    throw error;
  }
};
