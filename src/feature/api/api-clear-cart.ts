import type { Cart } from '@commercetools/platform-sdk';

import { useAuthStore } from '@/service/store/use-auth-store';

import AnonymousFlowApiClient from './api-client-anonymous';
import { createApiClientWithToken } from './api-client-token-flow';
import { fetchCart } from './api-fetch-cart';

export const clearCart = async (): Promise<Cart> => {
  const { token } = useAuthStore.getState();

  const apiRoot = token ? createApiClientWithToken(token) : AnonymousFlowApiClient();

  try {
    const currentCart = await fetchCart();

    await apiRoot
      .me()
      .carts()
      .withId({ ID: currentCart.id })
      .delete({
        queryArgs: {
          version: currentCart.version,
        },
      })
      .execute();

    const newCart = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'EUR',
        },
      })
      .execute();
    return newCart.body;
  } catch (error) {
    console.error('Error emptying cart:', error);
    throw error;
  }
};
