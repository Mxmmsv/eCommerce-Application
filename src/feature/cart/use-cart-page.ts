import type { Cart } from '@commercetools/platform-sdk';
import { useState } from 'react';
import useSWR from 'swr';

import { fetchCart } from '../api/api-fetch-cart';

export const useCartPage = () => {
  const { data: cart, error, isLoading } = useSWR<Cart, Error>('cart', fetchCart);

  const [shippingMethod, setShippingMethod] = useState<string>('standard');

  return {
    cart,
    error,
    isLoading,
    shippingMethod,
    setShippingMethod,
  };
};
