import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { Poster } from '../types';

import { mapToPoster } from './map-products';

export const fetchProducts = async (categoryId?: string): Promise<Poster[]> => {
  const response = await apiRoot
    .productProjections()
    .get({
      queryArgs: {
        where: categoryId ? `categories(id="${categoryId}")` : undefined,
      },
    })
    .execute();
  return response.body.results.map(mapToPoster);
};
