import type { Product } from '@commercetools/platform-sdk';

import apiRoot from '@/feature/api/api-client-credentials-flow';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await apiRoot.products().get().execute();
  return response.body.results;
};
