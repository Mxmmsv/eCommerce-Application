import type { CartItemUI, ShippingMethod } from './types';

export const useCartSummary = (items: CartItemUI[], shippingMethod: string) => {
  const shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 5.99,
      estimatedDays: '3-5 days',
      description: 'Free shipping on orders over $200',
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 12.99,
      estimatedDays: '1-2 days',
      description: 'Priority delivery with tracking',
    },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingMethods.find((m) => m.id === shippingMethod)?.price || 0;
  const total = subtotal + shipping;

  return { subtotal, shipping, total, shippingMethods };
};
