import useFetchProduct from './api/get-product-overview';
import type { ProductData } from './types';

const defaultProduct: Omit<ProductData, 'isLoading' | 'error'> = {
  name: 'Product not found',
  description: 'No description available',
  image: [{ url: '/placeholder-product.webp' }],
  alt: 'not-fount-page',
  price: '0.00',
  currencyCode: 'EUR',
  discount: '0.00',
};

export function useProductOverview(productId: string): ProductData {
  const { data, error, isLoading } = useFetchProduct(productId);

  if (error?.name === 'NotFound') return { ...defaultProduct, isLoading: false, error: null };
  if (!data) return { ...defaultProduct, isLoading: true, error: null };

  const currentData = data.masterData.current;
  const priceInfo = currentData.masterVariant.prices?.[0];
  const discount = priceInfo?.discounted
    ? (priceInfo.discounted.value.centAmount / 100).toFixed(2)
    : defaultProduct.discount;

  return {
    name: currentData.name['en-GB'] || defaultProduct.name,
    description: currentData.description?.['en-GB'] || defaultProduct.description,
    image: currentData.masterVariant.images?.length
      ? currentData.masterVariant.images
      : defaultProduct.image,
    alt: currentData.name['en-GB'] || defaultProduct.alt,
    price: priceInfo ? (priceInfo.value.centAmount / 100).toFixed(2) : defaultProduct.price,
    currencyCode: priceInfo?.value.currencyCode || defaultProduct.currencyCode,
    discount,
    isLoading,
    error: error || null,
  };
}
