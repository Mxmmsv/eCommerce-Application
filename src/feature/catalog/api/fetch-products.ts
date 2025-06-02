import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { Poster } from '../types';

import { mapToPoster } from './map-products';

export const fetchProducts = async (
  categoryId?: string,
  sortOption?: string,
  selectedTypes?: string[],
  onlyDiscounted?: boolean,
): Promise<Poster[]> => {
  const filters = [];

  if (categoryId) {
    filters.push(`categories.id:"${categoryId}"`);
  }

  if (selectedTypes && selectedTypes.length > 0) {
    filters.push(`productType.id:${selectedTypes.map((id) => `"${id}"`).join(',')}`);
  }

  const queryArgs = {
    ...(filters.length > 0 && { filter: filters }),
    ...(sortOption && { sort: [sortOption] }),
    expand: ['productType'],
    limit: 100,
    priceCurrency: 'EUR',
  };

  const response = await apiRoot.productProjections().search().get({ queryArgs }).execute();

  let products = response.body.results.map(mapToPoster);
  if (onlyDiscounted) {
    products = products.filter((product) => product.hasDiscount);
  }

  return products;
};
