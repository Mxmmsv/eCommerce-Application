import type { ProductProjection } from '@commercetools/platform-sdk';

import type { Poster } from '../types';

export const mapToPoster = (product: ProductProjection): Poster => {
  const priceInfo = product.masterVariant.prices?.[0];
  const original = priceInfo ? priceInfo.value.centAmount / 100 : 0;
  const discounted = priceInfo?.discounted ? priceInfo.discounted.value.centAmount / 100 : original;
  const discountPercent =
    original > discounted ? Math.round(((original - discounted) / original) * 100) : 0;
  return {
    id: product.id,
    name: product.name['en-GB'] || 'No name',
    description: product.description?.['en-GB'] || 'No description available',
    image: product.masterVariant.images?.[0]?.url || '/placeholder-product.webp',
    price: original.toFixed(2),
    discount: discounted !== original ? discounted.toFixed(2) : undefined,
    discountPercent: discounted !== original ? discountPercent : undefined,
    hasDiscount: discounted !== original,
    currencyCode: priceInfo?.value.currencyCode || 'EUR',
  };
};
