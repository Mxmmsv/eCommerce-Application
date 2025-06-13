import type { Cart } from '@commercetools/platform-sdk';

import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { HttpStatusCode, isHttpError } from '@/feature/api/errors';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { getAuthFromLocalStorage } from '@/service/store/local-storage';

export const fetchCart = async (): Promise<Cart> => {
  const isAuthenticated = getAuthFromLocalStorage().IS_AUTHORIZED;
  const token = getAuthFromLocalStorage().ACCESS_TOKEN_KEY;
  const { cartId, setCartId } = useCartStore.getState();

  const apiRoot = isAuthenticated && token ? createApiClientWithToken() : AnonymousFlowApiClient();

  try {
    if (isAuthenticated && token) {
      const response = await apiRoot.me().carts().get().execute();
      const meCarts = response.body.results;
      if (meCarts.length === 0) {
        const newCart = await apiRoot
          .me()
          .carts()
          .post({
            body: {
              currency: 'EUR',
            },
          })
          .execute();
        setCartId(newCart.body.id);
        return newCart.body;
      }

      setCartId(meCarts[0].id);
      return meCarts[0];
    } else {
      if (!cartId) {
        const newCart = await apiRoot
          .carts()
          .post({
            body: { currency: 'EUR' },
          })
          .execute();

        setCartId(newCart.body.id);
        return newCart.body;
      }
      try {
        const response = await apiRoot.carts().withId({ ID: cartId }).get().execute();
        return response.body;
      } catch {
        const newCart = await apiRoot
          .carts()
          .post({
            body: { currency: 'EUR' },
          })
          .execute();
        setCartId(newCart.body.id);
        return newCart.body;
      }
    }
  } catch (error) {
    if (!isHttpError(error)) {
      console.error(error);
      throw new Error('Unknown cart error');
    }

    if (error.statusCode === HttpStatusCode.NotFound) {
      throw new Error('Cart not found');
    }
    if (error.statusCode === HttpStatusCode.Unauthorized) {
      throw new Error('Please log in to access your cart');
    }
    throw new Error(`Cart error: ${error.statusCode}`);
  }
};
