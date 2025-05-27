type ProductData = {
  name: string;
  description: string;
  image: { url: string }[];
  alt: string;
  price: string;
  currencyCode: string;
  discount: string;
  isLoading: boolean;
  error: Error | null;
};

export type { ProductData };
