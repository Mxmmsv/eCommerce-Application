import { useEffect, useState } from 'react';

import getProductOverview from './api/get-product-overview';

export function useProductOverview(productId: string) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCurrencyCode, setProductCurrencyCode] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const product = await getProductOverview(productId);
        if (product) {
          const name = product.name['en-GB'];
          const description = product.description?.['en-GB'];
          const image = product.masterVariant?.images?.[0]?.url;
          const prices = product.masterVariant.prices;

          if (prices) {
            const { value, discounted } = prices[0];
            const currency = value.currencyCode;
            const price = (value.centAmount / 100).toFixed(2);
            const discountPrice = discounted
              ? (discounted.value.centAmount / 100).toFixed(2)
              : price;

            setProductCurrencyCode(currency);
            setProductPrice(price);
            setProductDiscount(discountPrice);
          }
          setProductName(name);
          setProductDescription(description ?? '');
          setProductImage(image ?? '');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  return {
    productImage,
    productName,
    productPrice,
    productCurrencyCode,
    productDescription,
    productDiscount,
    loading,
    error,
  };
}
