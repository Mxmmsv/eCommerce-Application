import type { ProductProjection } from '@commercetools/platform-sdk';
import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';
import { fetchProducts } from '@/feature/catalog/api/fetch-products';
import { Breadcrumbs } from '@/feature/catalog/breadcrumbs';
import { CategoryNavigation } from '@/feature/catalog/category-navigation';
import { ProductList } from '@/feature/catalog/product-list';
import { useCategoryStore } from '@/service/store/use-category-store';

export default function CatalogPage() {
  const { currentPath } = useCategoryStore();
  const lastCategoryId = currentPath[currentPath.length - 1]?.id;

  console.log(lastCategoryId);

  const {
    data: products,
    error,
    isLoading,
  } = useSWR<ProductProjection[], Error>(['commercetools/products', lastCategoryId], () =>
    fetchProducts(lastCategoryId),
  );

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
        <CategoryNavigation />
        <Breadcrumbs />
        <ProductList products={products || []} />
      </div>
    </div>
  );
}
