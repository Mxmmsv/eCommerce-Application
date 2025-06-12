import { toast } from 'sonner';

import apiClientAnonymous from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';

export async function addToCart(productId: string, isAuthenticated: boolean, token: string | null) {
  const { cartId, setCart } = useCartStore.getState();

  const apiClient = isAuthenticated && token ? createApiClientWithToken() : apiClientAnonymous;

  const resolvedApiClient = typeof apiClient === 'function' ? apiClient() : apiClient;

  try {
    let cart = null;

    if (isAuthenticated) {
      const response = await resolvedApiClient.me().carts().get().execute();

      const meCarts = response.body.results;

      if (meCarts.length === 0) {
        const createResponse = await resolvedApiClient
          .me()
          .carts()
          .post({
            body: {
              currency: 'EUR',
            },
          })
          .execute();
        cart = createResponse.body;
        setCart(cart);
      } else {
        cart = meCarts[0];
        setCart(cart);
      }

      const updatedCartResponse = await resolvedApiClient
        .me()
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: 'addLineItem',
                productId,
                quantity: 1,
              },
            ],
          },
        })
        .execute();
      setCart(updatedCartResponse.body);
      toast.info('Product added to cart successfully!');

      return updatedCartResponse.body;
    } else {
      if (!cartId) {
        const response = await resolvedApiClient
          .carts()
          .post({
            body: {
              currency: 'EUR',
            },
          })
          .execute();
        cart = response.body;
        setCart(cart);
      } else {
        const response = await resolvedApiClient.carts().withId({ ID: cartId }).get().execute();
        cart = response.body;
      }

      const updatedCartResponse = await resolvedApiClient
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: 'addLineItem',
                productId,
                quantity: 1,
              },
            ],
          },
        })
        .execute();

      setCart(updatedCartResponse.body);
      toast.info('Product added to cart successfully!');

      return updatedCartResponse.body;
    }
  } catch (error) {
    console.error('Failed to add to cart', error);
    toast.error('Failed to add product to cart.');
  }
}
