import type { Cart } from '@commercetools/platform-sdk';

import { useAuthStore } from '@/service/store/use-auth-store';

import AnonymousFlowApiClient from './api-client-anonymous';
import { createApiClientWithToken } from './api-client-token-flow';
import { HttpStatusCode, isHttpError } from './errors';

export const fetchCart = async (): Promise<Cart> => {
  const { isAuthenticated, token } = useAuthStore.getState();

  const apiRoot =
    isAuthenticated && token ? createApiClientWithToken(token) : AnonymousFlowApiClient();

  try {
    const response = await apiRoot.me().activeCart().get().execute();

    return response.body;
  } catch (error) {
    if (!isHttpError(error)) {
      throw new Error('Unknown cart error');
    }

    if (error.statusCode === HttpStatusCode.NotFound) {
      const cart = await apiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
        })
        .execute();
      return cart.body;
    }
    if (error.statusCode === HttpStatusCode.Unauthorized) {
      throw new Error('Please log in to access your cart');
    }
    throw new Error(`Cart error: ${error.statusCode}`);
  }
};

export const clearCart = async (): Promise<Cart> => {
  const { isAuthenticated, token } = useAuthStore.getState();

  const apiRoot =
    isAuthenticated && token ? createApiClientWithToken(token) : AnonymousFlowApiClient();

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
