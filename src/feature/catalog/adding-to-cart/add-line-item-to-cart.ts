import type { Cart } from '@commercetools/platform-sdk';
import { toast } from 'sonner';

import apiClientAnonymous from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';

import { useCartStore } from './use-cart-store';

export async function addLineItemToCart(
  cart: Cart,
  productId: string,
  isAuthenticated: boolean,
  token: string | null,
): Promise<Cart> {
  const { setCart } = useCartStore.getState();

  const apiClient = isAuthenticated && token ? createApiClientWithToken() : apiClientAnonymous;

  const resolvedApiClient = typeof apiClient === 'function' ? apiClient() : apiClient;

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
