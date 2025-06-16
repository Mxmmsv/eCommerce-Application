import type { CartItemUI } from './types';

export const useCartSummary = (items: CartItemUI[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const total = subtotal;

  return {
    subtotal,
    total,
  };
};
