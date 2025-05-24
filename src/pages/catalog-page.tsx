import { useEffect, useState } from 'react';

import { ProductList } from '@/components/product-list';
import { Spinner } from '@/components/ui/spiner';
import { fetchProducts } from '@/feature/catalog/api/fetch-products';
import { mapToProduct } from '@/feature/catalog/api/map-products';
import type { Product } from '@/feature/catalog/types';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const apiProducts = await fetchProducts();
        setProducts(apiProducts.map(mapToProduct));
      } catch (error) {
        console.error('Error to load products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

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
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh items-center justify-center text-lg">
      <div className="container py-8">
        <ProductList products={products} />
      </div>
    </div>
  );
}
