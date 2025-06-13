import type {
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
  const { cart } = useCartStore.getState();
  const customerLogin: CustomerSignin = {
    email,
    password,
    anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    ...(cart?.id ? { anonymousCart: { id: cart.id, typeId: 'cart' } } : {}),
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

  setAuthToLocalStorage(token, true);
  useCustomerStore.getState().setCustomer(response.body.customer);

  if (response.body.cart) {
    useCartStore.getState().setCart(response.body.cart);
  } else {
    const newCart = await createApiClientWithToken()
      .me()
      .carts()
      .post({ body: { currency: 'EUR' } })
      .execute();
    useCartStore.getState().setCart(newCart.body);
  }

  return response;
};
