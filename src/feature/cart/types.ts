import type { LineItem } from '@commercetools/platform-sdk';

export type CartItemUI = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  stock: number;
  image: string;
};

export type CartResponse = {
  lineItems: LineItem[];
};

export type ShippingMethod = {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
};

export type ShippingMethodId = string;
