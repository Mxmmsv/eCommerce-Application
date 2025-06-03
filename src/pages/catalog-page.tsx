import { useSearchParams } from 'react-router';
import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';
import { fetchProducts } from '@/feature/catalog/api/fetch-products';
import { Breadcrumbs } from '@/feature/catalog/categories/breadcrumbs';
import { CategoryNavigation } from '@/feature/catalog/categories/category-navigation';
import { TypeFilter } from '@/feature/catalog/filter/type-filter';
import { useFilterStore } from '@/feature/catalog/filter/use-filter-store';
import { ProductList } from '@/feature/catalog/product-list';
import { useSortStore } from '@/feature/catalog/sorting/use-sort-store';
import type { Poster } from '@/feature/catalog/types';
import { useCategoryStore } from '@/service/store/use-category-store';

export default function CatalogPage() {
  const { currentPath } = useCategoryStore();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || undefined;

  const lastCategoryId = currentPath[currentPath.length - 1]?.id;
  const { sortOption } = useSortStore();
  const { selectedTypes, onlyDiscounted, priceRange } = useFilterStore();

  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Poster[], Error>(
    [
      'commercetools/products',
      lastCategoryId,
      searchQuery,
      sortOption,
      selectedTypes,
      onlyDiscounted,
      priceRange,
    ],
    () =>
      fetchProducts(
        lastCategoryId,
        searchQuery,
        sortOption,
        selectedTypes,
        onlyDiscounted,
        priceRange,
      ),
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
    <>
      <title>{'Catalog :: Poster store'}</title>
      <div className="bg-muted flex min-h-svh justify-center text-lg">
        <div className="container py-8">
          <div className="flex items-start gap-4 px-4">
            <CategoryNavigation />
            <Breadcrumbs />
          </div>

          <TypeFilter />

          {searchQuery && (
            <div className="mb-4 px-4">
              <h2 className="text-xl font-semibold">
                Search results for: <span className="text-primary">{searchQuery}</span>
              </h2>
            </div>
          )}

          {products?.length === 0 && (
            <div className="text-muted-foreground mt-4 text-center">
              No products found {searchQuery ? `for "${searchQuery}"` : ''}.
            </div>
          )}

          <ProductList products={products || []} />
        </div>
      </div>
    </>
  );
}
