export type CartItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  stock: number;
  image: string;
};

export type ShippingMethod = {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
};
