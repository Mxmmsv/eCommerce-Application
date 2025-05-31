import type { ProductProjection } from '@commercetools/platform-sdk';

import type { Poster } from '../types';

export const mapToPoster = (product: ProductProjection): Poster => {
  const priceInfo = product.masterVariant.prices?.[0];
  const price = priceInfo ? (priceInfo.value.centAmount / 100).toFixed(2) : '0.00';
  const discount = priceInfo?.discounted
    ? (priceInfo.discounted.value.centAmount / 100).toFixed(2)
    : undefined;

  return {
    id: product.id,
    name: product.name['en-GB'] || 'No name',
    description: product.description?.['en-GB'] || 'No description available',
    image: product.masterVariant.images?.[0]?.url || '/placeholder-product.webp',
    price,
    currencyCode: priceInfo?.value.currencyCode || 'EUR',
    discount,
  };
};
