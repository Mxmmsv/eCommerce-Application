import { config } from '@/config';
import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { Poster } from '../types';

import { mapToPoster } from './map-products';

const { productsPerPage } = config;

export const fetchProducts = async (
  categoryId?: string,
  searchQuery?: string,
  sortOption?: string,
  selectedTypes?: string[],
  onlyDiscounted?: boolean,
  priceRange?: [number, number],
  currentPage = 1,
): Promise<{ products: Poster[]; total: number }> => {
  const filters: string[] = [];

  if (categoryId) {
    filters.push(`categories.id:"${categoryId}"`);
  }

  if (selectedTypes && selectedTypes.length > 0) {
    filters.push(`productType.id:${selectedTypes.map((id) => `"${id}"`).join(',')}`);
  }

  if (priceRange && Array.isArray(priceRange) && priceRange.length === 2) {
    const [min, max] = priceRange;
    filters.push(`variants.price.centAmount:range (${min * 100} to ${max * 100})`);
  }

  const offset = (currentPage - 1) * productsPerPage;

  const queryArgs: Record<string, number | boolean | string | string[]> = {
    fuzzy: true,
    limit: productsPerPage,
    offset: offset,
    priceCurrency: 'EUR',
    expand: ['productType'],
    ...(filters.length > 0 && { filter: filters }),
    ...(sortOption && { sort: [sortOption] }),
  };

  if (searchQuery) {
    queryArgs['text.en-GB'] = searchQuery;
  }

  const response = await apiRoot.productProjections().search().get({ queryArgs }).execute();

  let products = response.body.results.map(mapToPoster);

  if (onlyDiscounted) {
    products = products.filter((product) => product.hasDiscount);
  }

  return {
    products,
    total: response.body.total ?? 0,
  };
};
