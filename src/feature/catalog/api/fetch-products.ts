// import apiRoot from '@/feature/api/api-client-credentials-flow';

// import type { Poster } from '../types';

// import { mapToPoster } from './map-products';

// export const fetchProducts = async (
//   categoryId?: string,
//   sortOption?: string,
// ): Promise<Poster[]> => {
//   const queryArgs: {
//     where?: string;
//     sort?: string[];
//     priceCurrency?: string;
//     limit: number;
//   } = {
//     limit: 100,
//   };

//   if (categoryId) {
//     queryArgs.where = `categories(id="${categoryId}")`;
//   }

//   if (sortOption && sortOption !== 'none') {
//     queryArgs.sort = [sortOption];
//     if (sortOption.includes('price')) {
//       queryArgs.priceCurrency = 'EUR';
//     }
//   }

//   const response = await apiRoot.productProjections().get({ queryArgs }).execute();
//   return response.body.results.map(mapToPoster);
// };

import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { Poster } from '../types';

import { mapToPoster } from './map-products';

export const fetchProducts = async (
  categoryId?: string,
  sortOption?: string,
): Promise<Poster[]> => {
  const isSearchEndpoint = sortOption?.includes('price');

  const apiCall = isSearchEndpoint
    ? apiRoot.productProjections().search()
    : apiRoot.productProjections();

  const response = await apiCall
    .get({
      queryArgs: {
        where: categoryId ? `categories(id="${categoryId}")` : undefined,
        sort: sortOption ? [sortOption] : undefined,
        limit: 100,
        ...(isSearchEndpoint && { priceCurrency: 'EUR' }),
      },
    })
    .execute();

  return response.body.results.map(mapToPoster);
};
