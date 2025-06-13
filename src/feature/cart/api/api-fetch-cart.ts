import type { Cart } from '@commercetools/platform-sdk';

import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { HttpStatusCode, isHttpError } from '@/feature/api/errors';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { getAuthFromLocalStorage } from '@/service/store/local-storage';

export const fetchCart = async (): Promise<Cart> => {
  const auth = getAuthFromLocalStorage();
  const isAuthenticated = auth.IS_AUTHORIZED;
  const token = auth.ACCESS_TOKEN_KEY;
  const { cart, setCart } = useCartStore.getState();

  const apiClient =
    isAuthenticated && token ? createApiClientWithToken() : AnonymousFlowApiClient();

  try {
    if (isAuthenticated) {
      const response = await apiClient.me().carts().get().execute();
      const meCarts = response.body.results;

      if (meCarts.length > 0) {
        setCart(meCarts[0]);
        return meCarts[0];
      }
      const newCart = await apiClient
        .me()
        .carts()
        .post({
          body: { currency: 'EUR' },
        })
        .execute();
      setCart(newCart.body);
      return newCart.body;
    }

    if (!cart) {
      const newCart = await apiClient
        .carts()
        .post({
          body: { currency: 'EUR' },
        })
        .execute();

      setCart(newCart.body);
      return newCart.body;
    }

    try {
      const cartResponse = await apiClient.carts().withId({ ID: cart.id }).get().execute();
      return cartResponse.body;
    } catch {
      const newCart = await apiClient
        .carts()
        .post({
          body: { currency: 'EUR' },
        })
        .execute();
      setCart(newCart.body);
      return newCart.body;
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
