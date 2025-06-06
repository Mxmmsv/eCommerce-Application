import type { Cart } from '@commercetools/platform-sdk';

import { useAuthStore } from '@/service/store/use-auth-store';

import AnonymousFlowApiClient from './api-client-anonymous';
import { createApiClientWithToken } from './api-client-token-flow';

export const fetchCart = async (): Promise<Cart> => {
  const { isAuthenticated, token } = useAuthStore.getState();

  const apiRoot =
    isAuthenticated && token ? createApiClientWithToken(token) : AnonymousFlowApiClient();

  try {
    const response = await apiRoot.me().activeCart().get().execute();

    return response.body;
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      const statusCode = (error as { statusCode: number }).statusCode;

      if (statusCode === 404) {
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
      }
    }
    throw new Error(
      'Failed to fetch cart: ' + (error instanceof Error ? error.message : String(error)),
    );
  }
};
