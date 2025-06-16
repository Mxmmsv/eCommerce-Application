import type { Cart, CartItemUI, ShippingMethod } from './types';

export const useCartSummary = (
  items: CartItemUI[],
  cart: Cart | null,
  selectedShippingMethodId: string,
  availableShippingMethods: ShippingMethod[] = [],
) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const selectedMethod = availableShippingMethods.find((m) => m.id === selectedShippingMethodId);
  const shipping = selectedShippingMethodId === 'no-shipping' ? 0 : selectedMethod?.price || 0;

  const total = cart?.totalPrice ? cart.totalPrice.centAmount / 100 : subtotal + shipping;

  return {
    subtotal,
    shipping,
    total,
  };
};
