import type { Product } from '@commercetools/platform-sdk';
import useSWR from 'swr';

import apiRoot from './api-client-credentials-flow';

const fetcher = async (): Promise<Product[]> => {
  const response = await apiRoot.products().get().execute();
  return response.body.results;
};

const useFetchProducts = () => {
  const { data, error, isLoading } = useSWR<Product[], Error>('products', fetcher);
  return { data, error, isLoading };
};

export default useFetchProducts;
