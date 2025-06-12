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

export type CartHeaderProps = {
  itemsCount: number;
};

export type CartContentProps = {
  items: CartItemUI[];
  shippingMethod: string;
  setShippingMethod: (method: string) => void;
  subtotal: number;
  shipping: number;
  total: number;
  shippingMethods: ShippingMethod[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, change: number) => void;
};

export type CartListProps = {
  items: CartItemUI[];
  removeItem: (id: string) => void;
  updateQuantity: (id: string, change: number) => void;
};

export type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  total: number;
  shippingMethod: ShippingMethodId;
  shippingMethods: ShippingMethod[];
  setShippingMethod: (methodId: ShippingMethodId) => void;
};

export type ShippingMethodsProps = {
  shippingMethods: ShippingMethod[];
  shippingMethod: ShippingMethodId;
  setShippingMethod: (methodId: ShippingMethodId) => void;
};
