import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useSWR from 'swr';

import { config } from '@/config';
import { fetchProducts } from '@/feature/catalog/api/fetch-products';
import { Breadcrumbs } from '@/feature/catalog/categories/breadcrumbs';
import { CategoryNavigation } from '@/feature/catalog/categories/category-navigation';
import { useCategoryStore } from '@/feature/catalog/categories/use-category-store';
import { DiscountFilter } from '@/feature/catalog/filter/discount-filter';
import { TypeFilter } from '@/feature/catalog/filter/type-filter';
import { useFilterStore } from '@/feature/catalog/filter/use-filter-store';
import { ProductsContainer } from '@/feature/catalog/products-container';
import { SortSelect } from '@/feature/catalog/sorting/sort-select';
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

  const [forcePage, setForcePage] = useState(1);

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
      forcePage,
    ],
    () =>
      fetchProducts(
        lastCategoryId,
        searchQuery,
        sortOption,
        selectedTypes,
        onlyDiscounted,
        priceRange,
        forcePage,
      ),
  );

  useEffect(() => {
    setForcePage(1);
  }, [lastCategoryId, searchQuery, sortOption, selectedTypes, onlyDiscounted, priceRange]);

  const onPageChange = (page: number) => {
    setForcePage(page);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <title>{'Catalog :: Poster store'}</title>
      <div className="bg-muted flex min-h-svh justify-center text-lg">
        <div className="container py-8">
          <div className="flex items-start gap-0 px-4 lg:gap-4">
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

          <div className="flex justify-end">
            <div className="mx-4 flex items-center justify-center">
              <DiscountFilter />
            </div>
            <SortSelect />
          </div>

          <ProductsContainer
            products={products}
            isLoading={isLoading}
            error={error}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}
