import apiRoot from '@/feature/api/api-client-credentials-flow';

async function fetchProducts() {
  const response = await apiRoot.productProjections().get().execute();
  const products = response.body.results;
  return products;
}

export default fetchProducts;
