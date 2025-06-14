import type { Cart } from '@commercetools/platform-sdk';

import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useAuthStore } from '@/service/store/use-auth-store';

import { fetchCart } from './api-fetch-cart';

export const clearCart = async (): Promise<Cart> => {
  const { token } = useAuthStore.getState();

  const apiRoot = token ? createApiClientWithToken() : AnonymousFlowApiClient();

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
