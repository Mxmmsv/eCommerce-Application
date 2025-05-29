import useFetchProduct from './api/get-product-overview';
import type { ProductData } from './types';

const defaultProduct: Omit<ProductData, 'isLoading' | 'error'> = {
  name: 'Product not found',
  description: 'No description available',
  images: [{ url: '/placeholder-product.webp' }],
  alt: 'not-found-page',
  price: '0.00',
  currencyCode: 'EUR',
  discount: '0.00',
  discountPercent: 0,
};

export function useProductOverview(productId: string): ProductData {
  const { data, error, isLoading } = useFetchProduct(productId);

  if (error?.name === 'NotFound') return { ...defaultProduct, isLoading: false, error: null };
  if (!data) return { ...defaultProduct, isLoading: true, error: null };

  const currentData = data.masterData.current;
  const priceInfo = currentData.masterVariant.prices?.[0];
  const original = priceInfo ? priceInfo.value.centAmount / 100 : 0;
  const discounted = priceInfo?.discounted ? priceInfo.discounted.value.centAmount / 100 : original;
  const discountPercent =
    original > discounted ? Math.round(((original - discounted) / original) * 100) : 0;

  return {
    name: currentData.name['en-GB'] || defaultProduct.name,
    description: currentData.description?.['en-GB'] || defaultProduct.description,
    images: currentData.masterVariant.images?.length
      ? currentData.masterVariant.images
      : defaultProduct.images,
    alt: currentData.name['en-GB'] || defaultProduct.alt,
    price: original.toFixed(2),
    discount: discounted.toFixed(2),
    discountPercent,
    currencyCode: priceInfo?.value.currencyCode || defaultProduct.currencyCode,
    isLoading,
    error: error || null,
  };
}
