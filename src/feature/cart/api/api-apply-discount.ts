import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { useAuthStore } from '@/service/store/use-auth-store';

export const applyDiscountCode = async (code: string) => {
  const { token } = useAuthStore.getState();
  const { cart, setCart } = useCartStore.getState();
  const apiRoot = token ? createApiClientWithToken() : AnonymousFlowApiClient();

  if (!cart) throw new Error('Cart not found');

  const response = await apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      },
    })
    .execute();

  setCart(response.body);
  return response.body;
};
