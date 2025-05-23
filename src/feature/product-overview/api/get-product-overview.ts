import fetchProducts from '@/feature/api/api-fetch-products';

const getProductOverview = async (productId: string) => {
  const products = await fetchProducts();
  const product = products.find((product) => product.id === productId);
  return product;
};

export default getProductOverview;
