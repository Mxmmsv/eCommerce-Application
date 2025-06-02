import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { Poster } from '../types';

import { mapToPoster } from './map-products';

export const fetchProducts = async (
  categoryId?: string,
  sortOption?: string,
  selectedTypes?: string[],
): Promise<Poster[]> => {
  const baseQueryArgs = {
    limit: 100,
    expand: ['productType'],
    ...(categoryId && { where: `categories(id="${categoryId}")` }),
    ...(selectedTypes &&
      selectedTypes.length > 0 && {
        where: selectedTypes.map((typeId) => `productType(id="${typeId}")`).join(' or '),
      }),
  };

  if (!sortOption) {
    const response = await apiRoot.productProjections().get({ queryArgs: baseQueryArgs }).execute();
    return response.body.results.map(mapToPoster);
  }

  if (sortOption.startsWith('name.en-GB')) {
    const response = await apiRoot
      .productProjections()
      .get({
        queryArgs: {
          ...baseQueryArgs,
          sort: [sortOption],
        },
      })
      .execute();
    return response.body.results.map(mapToPoster);
  }

  if (sortOption.includes('price')) {
    const filterQueries = [];
    if (categoryId) {
      filterQueries.push(`categories.id:"${categoryId}"`);
    }

    if (selectedTypes && selectedTypes.length > 0) {
      filterQueries.push(`productType.id:${selectedTypes.map((id) => `"${id}"`).join(',')}`);
    }

    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          ...(filterQueries.length > 0 && { filter: filterQueries }),
          expand: ['productType'],
          sort: [sortOption],
          limit: 100,
          priceCurrency: 'EUR',
        },
      })
      .execute();
    return response.body.results.map(mapToPoster);
  }

  throw new Error(`Unsupported sort option: ${sortOption}`);
};
