import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';

export const fetchProducts = async () => {
  const apiRoot = AnonymousFlowApiClient();
  const response = await apiRoot.products().get().execute();
  return response.body.results;
};
