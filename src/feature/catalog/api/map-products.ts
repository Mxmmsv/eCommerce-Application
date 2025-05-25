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
  };
};
