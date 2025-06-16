type ProductData = {
  name: string;
  description: string;
  images: { url: string }[];
  alt: string;
  price: string;
  currencyCode: 'EUR' | 'RUB';
  discount: string;
  discountPercent: number;
  isLoading: boolean;
  error: Error | null;
  masterVariant: {
    id: number;
  };
};

export type { ProductData };
