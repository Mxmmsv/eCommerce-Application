import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { Poster } from '../types';

import { mapToPoster } from './map-products';

export const fetchProducts = async (
  categoryId?: string,
  searchQuery?: string,
): Promise<Poster[]> => {
  const queryArgs: Record<string, string | boolean | number> = {
    fuzzy: true,
    limit: 100,
  };

  if (searchQuery) {
    queryArgs['text.en-GB'] = searchQuery;
  }
  if (categoryId) {
    queryArgs['filter.query'] = `categories.id:"${categoryId}"`;
  }

  const response = await apiRoot.productProjections().search().get({ queryArgs }).execute();

  return response.body.results.map(mapToPoster);
};
