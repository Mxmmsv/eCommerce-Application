import type { CommercetoolsProduct, Product } from '../types';

export const mapToProduct = (product: CommercetoolsProduct): Product => {
  const currentData = product.masterData?.current;
  const name = currentData?.name ? Object.values(currentData.name)[0] : 'No name';
  const imageUrl = currentData?.masterVariant?.images?.[0]?.url;

  const description = currentData?.description
    ? Object.values(currentData.description)[0]
    : 'No description available';

  console.log('Raw product data:', product);
  return {
    id: product.id,
    name,
    description,
    image: imageUrl || '/placeholder-product.jpg',
  };
};
