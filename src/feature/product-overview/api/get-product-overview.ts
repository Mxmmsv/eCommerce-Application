import type { Product } from '@commercetools/platform-sdk';
import useSWR from 'swr';

import apiRoot from '@/feature/api/api-client-credentials-flow';

const getProductOverview = async (productId: string): Promise<Product> => {
  const product = await apiRoot.products().withId({ ID: productId }).get().execute();
  return product.body;
};

const useFetchProduct = (productId: string) => {
  const { data, error, isLoading } = useSWR<Product, Error>(['product', productId], () =>
    getProductOverview(productId),
  );

  return { data, error, isLoading };
};

export default useFetchProduct;
