import { useEffect } from 'react';
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
  const lastCategoryId = currentPath[currentPath.length - 1]?.id;
  const { sortOption } = useSortStore();
  const { selectedTypes, onlyDiscounted, priceRange, setAvailablePriceRange, setPriceRange } =
    useFilterStore();

  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Poster[], Error>(
    [
      'commercetools/products',
      lastCategoryId,
      sortOption,
      selectedTypes,
      onlyDiscounted,
      priceRange,
    ],
    () => fetchProducts(lastCategoryId, sortOption, selectedTypes, onlyDiscounted, priceRange),
  );

  useEffect(() => {
    if (products && products.length > 0) {
      const prices = products.map((p) =>
        parseFloat(p.hasDiscount ? p.discount || p.price : p.price),
      );
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setAvailablePriceRange([min, max]);
      setPriceRange([min, max]);
    }
  }, [products, setAvailablePriceRange, setPriceRange]);

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
          <ProductList products={products || []} />
        </div>
      </div>
    </>
  );
}
