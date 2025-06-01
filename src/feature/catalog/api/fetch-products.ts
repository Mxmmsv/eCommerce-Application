import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { Poster } from '../types';

import { mapToPoster } from './map-products';

export const fetchProducts = async (
  categoryId?: string,
  sortOption?: string | null,
): Promise<Poster[]> => {
  console.log('Sort option:', sortOption);
  const response = await apiRoot
    .productProjections()
    .get({
      queryArgs: {
        where: categoryId ? `categories(id="${categoryId}")` : undefined,
        limit: 100,
      },
    })
    .execute();
  console.log('API response:', response.body.results);
  return response.body.results.map(mapToPoster);
};
