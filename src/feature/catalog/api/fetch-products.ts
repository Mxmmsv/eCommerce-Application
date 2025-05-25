import type { ProductProjection } from '@commercetools/platform-sdk';

import apiRoot from '@/feature/api/api-client-credentials-flow';

export const fetchProducts = async (categoryId?: string): Promise<ProductProjection[]> => {
  const response = await apiRoot
    .productProjections()
    .get({
      queryArgs: {
        where: categoryId ? `categories(id="${categoryId}")` : undefined,
      },
    })
    .execute();
  return response.body.results;
};
