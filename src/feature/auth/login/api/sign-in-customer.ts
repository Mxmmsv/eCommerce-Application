import type {
  Cart,
  ClientResponse,
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

import PasswordFlowApiClient from '@/feature/api/api-client-password-flow';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { tokenCache } from '@/feature/api/api-token-store';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';
import { setAuthToLocalStorage } from '@/service/store/local-storage';
import { useCustomerStore } from '@/service/store/use-user-store';

export const signInCustomer = async (
  email: string,
  password: string,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const { cart: anonymousCart, anonymousId } = useCartStore.getState();
  let existingUserCart: Cart | null = null;
  try {
    const apiClient = createApiClientWithToken();
    const response = await apiClient.me().carts().get().execute();
    existingUserCart = response.body.results[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      console.log('No existing user cart found:', error.message);
    }
  }

  const customerLogin: CustomerSignin = {
    email,
    password,
    anonymousCartSignInMode: existingUserCart?.lineItems.length
      ? 'UseExistingCustomerCart'
      : 'MergeWithExistingCustomerCart',
    ...(anonymousCart?.id && {
      anonymousCart: {
        id: anonymousCart.id,
        typeId: 'cart',
      },
      anonymousId: anonymousId || undefined,
    }),
  };

  const apiRoot = PasswordFlowApiClient(email, password);
  const response = await apiRoot
    .me()
    .login()
    .post({
      body: customerLogin,
    })
    .execute();

  const token = tokenCache.get().token;
  if (!token) {
    throw new Error('Authentication token not received');
  }

  setAuthToLocalStorage(token, true, response.body.customer.id);
  useCustomerStore.getState().setCustomer(response.body.customer);

  if (response.body.cart) {
    useCartStore.getState().setCart(response.body.cart);
  }

  return response;
};
