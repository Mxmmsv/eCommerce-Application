<<<<<<< HEAD
import type { ProductProjection } from '@commercetools/platform-sdk';

import type { Poster } from '../types';

export const mapToPoster = (product: ProductProjection): Poster => {
  return {
    id: product.id,
    name: product.name['en-GB'] || 'No name',
    description: product.description?.['en-GB'] || 'No description available',
    image: product.masterVariant.images?.[0]?.url || '/placeholder-product.webp',
=======
import type { Product } from '@commercetools/platform-sdk';

export const mapToProduct = (product: Product) => {
  const current = product.masterData.current;
  const name = current.name['en-GB'] || 'No name';
  const image = current.masterVariant.images?.[0]?.url || '/placeholder-product.webp';
  const description = current.description?.['en-GB'] || 'No description available';

  return {
    id: product.id,
    name,
    description,
    image,
>>>>>>> da20b29 (refactor: add type from sdk, add swr)
  };
};
