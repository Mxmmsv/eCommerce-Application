import { useEffect, useState } from 'react';

import { ProductGrid } from '@/components/product-grid';
import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import type { Product, ProductFromApi } from '@/feature/catalog/types';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiRoot = AnonymousFlowApiClient();
      try {
        const response = await apiRoot.products().get().execute();
        console.log('Full API data:', response.body);

        const mappedProducts = response.body.results.map((product: ProductFromApi) => {
          const currentData = product.masterData?.current;
          const variant = currentData?.masterVariant;
          return {
            id: product.id,
            name:
              currentData?.name?.['en-US'] ??
              Object.values(currentData?.name ?? {})[0] ??
              'No name',
            description:
              currentData?.description?.['en-US'] ??
              Object.values(currentData?.description ?? {})[0] ??
              '',
            image: variant?.images?.[0]?.url ?? '',
          };
        });
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    void fetchProducts();
  }, []);

  return (
    <div className="bg-muted flex min-h-svh items-center justify-center text-lg">
      <div className="container py-8">
        {products.length > 0 ? (
          <ProductGrid products={products.filter((p) => p.image !== null)} />
        ) : (
          <div className="text-center">Loading products...</div>
        )}
      </div>
    </div>
  );
}
