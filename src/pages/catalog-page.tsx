import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';
import { fetchProducts } from '@/feature/catalog/api/fetch-products';
import { Breadcrumbs } from '@/feature/catalog/categories/breadcrumbs';
import { CategoryNavigation } from '@/feature/catalog/categories/category-navigation';
import { ProductList } from '@/feature/catalog/product-list';
import type { Poster } from '@/feature/catalog/types';
import { useCategoryStore } from '@/service/store/use-category-store';

export default function CatalogPage() {
  const { currentPath } = useCategoryStore();
  const lastCategoryId = currentPath[currentPath.length - 1]?.id;

  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Poster[], Error>(['commercetools/products', lastCategoryId], () =>
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
    <div className="bg-muted flex min-h-svh justify-center text-lg">
      <div className="container py-8">
        <div className="mb-6 flex items-start gap-4 px-4">
          <CategoryNavigation />
          <Breadcrumbs />
        </div>
        <ProductList products={products || []} />
      </div>
    </div>
  );
}
