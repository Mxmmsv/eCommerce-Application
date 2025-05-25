<<<<<<< HEAD
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
=======
import type { Product } from '@commercetools/platform-sdk';

import apiRoot from '@/feature/api/api-client-credentials-flow';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await apiRoot.products().get().execute();
  return response.body.results;
>>>>>>> da20b29 (refactor: add type from sdk, add swr)
};
