import type { Product } from '@commercetools/platform-sdk';
import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';
import { fetchProducts } from '@/feature/catalog/api/fetch-products';
import { ProductList } from '@/feature/catalog/product-list';

const fetcher = async () => {
  const products = await fetchProducts();
  return products;
};

export default function CatalogPage() {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Product[], Error>('commercetools/products', fetcher);

  if (isLoading) {
    return (
      <div className="column flex min-h-svh items-center justify-center">
        <Spinner size="medium" className="text-primary">
          <span className="text-center">Loading products...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-center text-red-500">{error.message || 'Failed to load products'}</div>
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh items-center justify-center text-lg">
      <div className="container py-8">
        <ProductList products={products || []} />
      </div>
    </div>
  );
}
