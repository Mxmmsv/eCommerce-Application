import useSWR from 'swr';

import { fetchShippingMethods } from './api/api-fetch-shipping-methods';
import type { CartItemUI, ShippingMethod } from './types';

export const useCartSummary = (items: CartItemUI[], shippingMethod: string) => {
  const { data: shippingMethods } = useSWR<ShippingMethod[]>(
    '/shipping-methods',
    fetchShippingMethods,
    {
      revalidateOnFocus: false,
    },
  );

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping =
    shippingMethod === 'no-shipping'
      ? 0
      : shippingMethods?.find((m) => m.id === shippingMethod)?.price || 0;
  const total = subtotal + shipping;

  return {
    subtotal,
    shipping,
    total,
    shippingMethods: shippingMethods || [],
  };
};
