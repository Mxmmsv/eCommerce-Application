import useFetchProduct from './api/get-product-overview';

type ProductData = {
  name: string;
  description: string;
  image: { url: string }[];
  price: string;
  currencyCode: string;
  discount: string;
  isLoading: boolean;
  error: Error | null;
};

const defaultProduct: Omit<ProductData, 'isLoading' | 'error'> = {
  name: 'Product not found',
  description: 'No description available',
  image: [{ url: '/placeholder-product.webp' }],
  price: '0.00',
  currencyCode: 'EUR',
  discount: '0.00',
};

export function useProductOverview(productId: string) {
  const { data, error, isLoading } = useFetchProduct(productId);

  if (error?.name === 'NotFound') return { ...defaultProduct, isLoading: false, error: null };
  if (!data) return { isLoading: true, error: null };

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
    price: priceInfo ? (priceInfo.value.centAmount / 100).toFixed(2) : defaultProduct.price,
    currencyCode: priceInfo?.value.currencyCode || defaultProduct.currencyCode,
    discount,
    isLoading,
    error,
  };
}
