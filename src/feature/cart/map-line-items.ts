import type { LineItem } from '@commercetools/platform-sdk';

import type { CartItemUI } from './types';

export const mapLineItems = (items: LineItem[]): CartItemUI[] => {
  return items.map((item) => {
    const priceValue = item.price?.value?.centAmount || 0;
    const discountedValue = item.price?.discounted?.value?.centAmount;

    return {
      id: item.id,
      name: item.name['en-GB'] || 'No name',
      price: discountedValue ? discountedValue / 100 : priceValue / 100,
      originalPrice: discountedValue ? priceValue / 100 : undefined,
      quantity: item.quantity,
      stock: item.variant?.availability?.availableQuantity || 0,
      image: item.variant.images?.[0]?.url || '/placeholder-product.webp',
    };
  });
};
