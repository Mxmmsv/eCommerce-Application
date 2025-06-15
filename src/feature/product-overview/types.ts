type ProductData = {
  name: string;
  description: string;
  images: { url: string }[];
  alt: string;
  price: string;
  currencyCode: string;
  discount: string;
  discountPercent: number;
  isLoading: boolean;
  error: Error | null;
};

export type { ProductData };
