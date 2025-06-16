import type { Cart } from '@commercetools/platform-sdk';
import { useState } from 'react';
import useSWR from 'swr';

import { fetchCart } from '@/feature/cart/api/api-fetch-cart';
import { useCartStore } from '@/feature/catalog/adding-to-cart/use-cart-store';

export const useCartPage = () => {
  const { setCart } = useCartStore();
  const [shippingMethod, setShippingMethod] = useState<string>('');

  const {
    data: cart,
    error,
    isLoading,
  } = useSWR<Cart, Error>(
    'cart',
    async () => {
      const cart = await fetchCart();
      setCart(cart);
      return cart;
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  return {
    cart: cart || null,
    error,
    isLoading,
    shippingMethod,
    setShippingMethod,
  };
};
