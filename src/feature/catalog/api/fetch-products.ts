import type { ProductProjection } from '@commercetools/platform-sdk';

import apiRoot from '@/feature/api/api-client-credentials-flow';

export const fetchProducts = async (categoryId?: string): Promise<ProductProjection[]> => {
  try {
    console.log('Fetching products with categoryId:', categoryId);
    const response = await apiRoot
      .productProjections()
      .get({
        queryArgs: {
          where: categoryId ? `categories(id="${categoryId}")` : undefined,
        },
      })
      .execute();
    console.log('API Response:', response.body.results);
    return response.body.results;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};
