import type { ProductProjection } from '@commercetools/platform-sdk';

export const mapToProduct = (product: ProductProjection) => {
  return {
    id: product.id,
    name: product.name['en-GB'] || 'No name',
    description: product.description?.['en-GB'] || 'No description available',
    image: product.masterVariant.images?.[0]?.url || '/placeholder-product.webp',
  };
};
