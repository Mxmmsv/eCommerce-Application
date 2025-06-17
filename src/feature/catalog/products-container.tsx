import { useDeferredValue } from 'react';

import { Spinner } from '@/components/ui/spinner';

import { ProductList } from './product-list';
import type { Poster } from './types';

type ProductsContainerProps = {
  products: { products: Poster[]; total: number } | undefined;
  isLoading: boolean;
  error: Error | undefined;
  currentPage: number;
  productsPerPage: number;
  onPageChange: (page: number) => void;
  searchQuery?: string;
};

export const ProductsContainer = ({
  products,
  isLoading,
  error,
  currentPage,
  productsPerPage,
  onPageChange,
  searchQuery,
}: ProductsContainerProps) => {
  const deferredProducts = useDeferredValue(products);
  const isStale = deferredProducts !== products;

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

  if (!deferredProducts || deferredProducts.products.length === 0) {
    return (
      <div className="text-muted-foreground mt-4 text-center">
        No products found {searchQuery ? `for "${searchQuery}"` : ''}.
      </div>
    );
  }

  return (
    <ProductList
      products={deferredProducts?.products || []}
      totalProducts={deferredProducts?.total || 0}
      currentPage={currentPage}
      productsPerPage={productsPerPage}
      onPageChange={onPageChange}
      isStale={isStale}
    />
  );
};
