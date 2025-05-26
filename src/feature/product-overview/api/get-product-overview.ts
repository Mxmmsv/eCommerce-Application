import type { Product } from '@commercetools/platform-sdk';

import apiRoot from '@/feature/api/api-client-credentials-flow';

const getProductOverview = async (productId: string): Promise<Product> => {
  const product = await apiRoot.products().withId({ ID: productId }).get().execute();
  return product.body;
};

export default getProductOverview;
