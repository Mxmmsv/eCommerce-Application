import type { Product } from '@commercetools/platform-sdk';
import useSWR from 'swr';

import apiRoot from '@/feature/api/api-client-credentials-flow';

const getProductOverview = async (productSlug: string): Promise<Product> => {
  const product = await apiRoot
    .products()
    .get({
      queryArgs: {
        where: `masterData(current(slug(en-GB="${productSlug}")))`,
      },
    })
    .execute();
  return product.body.results[0];
};

const useFetchProduct = (productSlug: string) => {
  const { data, error, isLoading } = useSWR<Product, Error>(['product', productSlug], () =>
    getProductOverview(productSlug),
  );

  return { data, error, isLoading };
};

export default useFetchProduct;
