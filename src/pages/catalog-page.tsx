import { useSearchParams } from 'react-router';
import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';
import { config } from '@/config';
import { fetchProducts } from '@/feature/catalog/api/fetch-products';
import { Breadcrumbs } from '@/feature/catalog/categories/breadcrumbs';
import { CategoryNavigation } from '@/feature/catalog/categories/category-navigation';
import { useCategoryStore } from '@/feature/catalog/categories/use-category-store';
import { TypeFilter } from '@/feature/catalog/filter/type-filter';
import { useFilterStore } from '@/feature/catalog/filter/use-filter-store';
import { ProductList } from '@/feature/catalog/product-list';
import { useSortStore } from '@/feature/catalog/sorting/use-sort-store';
import type { Poster } from '@/feature/catalog/types';

export default function CatalogPage() {
  const { currentPath } = useCategoryStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || undefined;

  const lastCategoryId = currentPath[currentPath.length - 1]?.id;
  const { sortOption } = useSortStore();
  const { selectedTypes, onlyDiscounted, priceRange } = useFilterStore();

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? Number(pageParam) : 1;

  const { productsPerPage } = config;

  const onPageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const {
    data: products,
    error,
    isLoading,
  } = useSWR<{ products: Poster[]; total: number }, Error>(
    [
      'commercetools/products',
      lastCategoryId,
      searchQuery,
      sortOption,
      selectedTypes,
      onlyDiscounted,
      priceRange,
      currentPage,
    ],
    () =>
      fetchProducts(
        lastCategoryId,
        searchQuery,
        sortOption,
        selectedTypes,
        onlyDiscounted,
        priceRange,
        currentPage,
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

          {products?.products?.length === 0 && (
            <div className="text-muted-foreground mt-4 text-center">
              No products found {searchQuery ? `for "${searchQuery}"` : ''}.
            </div>
          )}

          <ProductList
            products={products?.products || []}
            totalProducts={products?.total || 0}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}
