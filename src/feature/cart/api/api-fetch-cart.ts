import type { Cart } from '@commercetools/platform-sdk';

import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { HttpStatusCode, isHttpError } from '@/feature/api/errors';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { useAuthStore } from '@/service/store/use-auth-store';

export const fetchCart = async (): Promise<Cart> => {
  const { isAuthenticated } = useAuthStore.getState();
  const { cart: anonymousCart, setCart } = useCartStore.getState();

  try {
    if (isAuthenticated) {
      const apiClient = createApiClientWithToken();
      const response = await apiClient.me().carts().get().execute();
      const userCarts = response.body.results;

      if (userCarts.length > 0) {
        const lastCart = userCarts[userCarts.length - 1];
        setCart(lastCart);
        return lastCart;
      }

      if (anonymousCart?.lineItems.length) {
        const newCart = await apiClient
          .me()
          .carts()
          .post({
            body: {
              currency: 'EUR',
              lineItems: anonymousCart.lineItems.map((item) => ({
                productId: item.productId,
                variantId: item.variant.id,
                quantity: item.quantity,
              })),
            },
          })
          .execute();

        setCart(newCart.body);
        return newCart.body;
      }

      const newCart = await apiClient
        .me()
        .carts()
        .post({ body: { currency: 'EUR' } })
        .execute();

      setCart(newCart.body);
      return newCart.body;
    }

    const apiClient = AnonymousFlowApiClient();
    if (anonymousCart?.id) {
      try {
        const cartResponse = await apiClient
          .carts()
          .withId({ ID: anonymousCart.id })
          .get()
          .execute();

        setCart(cartResponse.body);
        return cartResponse.body;
      } catch (error) {
        if (!isHttpError(error) || error.statusCode !== HttpStatusCode.NotFound) {
          throw error;
        }
      }
    }

    const newCart = await apiClient
      .carts()
      .post({ body: { currency: 'EUR' } })
      .execute();

    setCart(newCart.body);
    return newCart.body;
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
