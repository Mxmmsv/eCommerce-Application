import { useDeferredValue, useEffect, useState } from 'react';

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
  const [displayProducts, setDisplayProducts] = useState<{ products: Poster[]; total: number }>();
  const deferredProducts = useDeferredValue(products);
  const isStale = deferredProducts !== products;

  useEffect(() => {
    if (products && !isLoading) {
      setDisplayProducts(products);
    }
  }, [products, isLoading]);

  if (isLoading && !displayProducts) {
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

  if (!displayProducts || displayProducts.products.length === 0) {
    return (
      <div className="text-muted-foreground mt-4 text-center">
        No products found {searchQuery ? `for "${searchQuery}"` : ''}.
      </div>
    );
  }

  return (
    <div className="relative">
      <ProductList
        products={displayProducts.products}
        totalProducts={displayProducts.total}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        onPageChange={onPageChange}
        isStale={isLoading || isStale}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center opacity-50">
          <Spinner size="medium" className="text-primary" />
        </div>
      )}
    </div>
  );
};
