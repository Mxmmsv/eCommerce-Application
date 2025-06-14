import type { Cart } from '@commercetools/platform-sdk';

import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { useAuthStore } from '@/service/store/use-auth-store';

import { fetchCart } from './api-fetch-cart';

export const clearCart = async (): Promise<Cart> => {
  const { token, isAuthenticated } = useAuthStore.getState();
  const { setCart } = useCartStore.getState();

  const apiRoot = isAuthenticated && token ? createApiClientWithToken() : AnonymousFlowApiClient();

  try {
    const currentCart = await fetchCart();

    if (isAuthenticated) {
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
    } else {
      const response = await apiRoot
        .carts()
        .withId({ ID: currentCart.id })
        .delete({
          queryArgs: {
            version: currentCart.version,
          },
        })
        .execute();

      const newCart = await apiRoot
        .carts()
        .post({ body: { currency: 'EUR' } })
        .execute();

      setCart(newCart.body);
      return newCart.body;

      return response.body;
    }
  } catch (error) {
    console.error('Error emptying cart:', error);
    throw error;
  }
};
