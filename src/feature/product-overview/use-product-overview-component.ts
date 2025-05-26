import { useEffect, useState } from 'react';

import getProductOverview from './api/get-product-overview';

type ProductData = {
  name: string;
  description: string;
  image: string;
  price: string;
  currencyCode: string;
  discount: string;
};

const initialProductData: ProductData = {
  name: '',
  description: '',
  image: '',
  price: '',
  currencyCode: '',
  discount: '',
};

export function useProductOverview(productId: string) {
  const [product, setProduct] = useState<ProductData>(initialProductData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const product = await getProductOverview(productId);

        if (product) {
          const name = product.name['en-GB'];
          const description = product.description?.['en-GB'] || 'No description available';
          const image = product.masterVariant?.images?.[0]?.url || '/placeholder-product.webp';
          const prices = product.masterVariant?.prices;

          let price = '';
          let currencyCode = '';
          let discount = '';

          if (prices) {
            const { value, discounted } = prices[0];
            currencyCode = value.currencyCode;
            price = (value.centAmount / 100).toFixed(2);
            discount = discounted ? (discounted.value.centAmount / 100).toFixed(2) : price;
          }

          setProduct({
            name,
            description,
            image,
            price,
            currencyCode,
            discount,
          });
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  return {
    ...product,
    loading,
    error,
  };
}
