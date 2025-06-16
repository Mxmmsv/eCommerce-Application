import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { useAuthStore } from '@/service/store/use-auth-store';

export const updateShippingMethod = async (shippingMethodId: string | null) => {
  const { token } = useAuthStore.getState();
  const { cart, setCart } = useCartStore.getState();
  const apiRoot = token ? createApiClientWithToken() : AnonymousFlowApiClient();

  if (!cart) throw new Error('Cart not found');

  try {
    if (!cart.shippingAddress) {
      await apiRoot
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: 'setShippingAddress',
                address: {
                  country: 'US',
                  city: 'Auto-set',
                },
              },
            ],
          },
        })
        .execute();
    }

    const response = await apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'setShippingMethod',
              shippingMethod: shippingMethodId
                ? {
                    typeId: 'shipping-method',
                    id: shippingMethodId,
                  }
                : undefined,
            },
          ],
        },
      })
      .execute();

    setCart(response.body);
    return response.body;
  } catch (error) {
    console.error('Failed to update shipping method:', error);
    throw error;
  }
};
