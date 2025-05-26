import type { Product } from '@commercetools/platform-sdk';

import apiRoot from '@/feature/api/api-client-credentials-flow';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await apiRoot.products().get().execute();
  const products = response.body.results;
  return products;
};

export default fetchProducts;
