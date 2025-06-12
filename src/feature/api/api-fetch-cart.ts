import type { Cart } from '@commercetools/platform-sdk';

import { useAuthStore } from '@/service/store/use-auth-store';

import { useCartStore } from '../catalog/adding-to-cart/use-cart-store';

import AnonymousFlowApiClient from './api-client-anonymous';
import { createApiClientWithToken } from './api-client-token-flow';
import { HttpStatusCode, isHttpError } from './errors';

export const fetchCart = async (): Promise<Cart> => {
  const { isAuthenticated, token } = useAuthStore.getState();

  const apiRoot = isAuthenticated && token ? createApiClientWithToken() : AnonymousFlowApiClient();

  try {
    const response = await apiRoot.me().activeCart().get().execute();
    const cart = response.body;

    if (cart.cartState !== 'Active') {
      throw new Error('Cart is not active');
    }

    useCartStore.getState().setCart(cart);
    return cart;
  } catch (error) {
    if (!isHttpError(error)) {
      throw new Error('Unknown cart error');
    }

    if (error.statusCode === HttpStatusCode.NotFound || error.message === 'Cart is not active') {
      const newCart = await apiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
        })
        .execute();

      useCartStore.getState().setCart(newCart.body);
      return newCart.body;
    }
    if (error.statusCode === HttpStatusCode.Unauthorized) {
      throw new Error('Please log in to access your cart');
    }
    throw new Error(`Cart error: ${error.statusCode}`);
  }
};
