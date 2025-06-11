import type { Cart } from '@commercetools/platform-sdk';

import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { HttpStatusCode, isHttpError } from '@/feature/api/errors';
import { useAuthStore } from '@/service/store/use-auth-store';

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
