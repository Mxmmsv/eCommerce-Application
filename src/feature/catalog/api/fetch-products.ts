import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { Poster } from '../types';

import { mapToPoster } from './map-products';

export const fetchProducts = async (
  categoryId?: string,
  sortOption?: string,
): Promise<Poster[]> => {
  try {
    const queryArgs: {
      where?: string;
      sort?: string[];
      priceCurrency: string;
      priceCountry?: string;
      limit: number;
    } = {
      priceCurrency: 'EUR',
      priceCountry: 'DE',
      limit: 100,
    };

    if (categoryId) queryArgs.where = `categories(id="${categoryId}")`;
    if (sortOption && sortOption !== 'none') queryArgs.sort = [sortOption];

    const response = await apiRoot.productProjections().get({ queryArgs }).execute();
    return response.body.results.map(mapToPoster);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to load products');
  }
};
