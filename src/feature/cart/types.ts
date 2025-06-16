export type CartItemUI = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  stock: number;
  image: string;
};

export type CartHeaderProps = {
  itemsCount: number;
};

export type CartContentProps = {
  items: CartItemUI[];
  subtotal: number;
  total: number;
  onRemove: (id: string) => Promise<void>;
  onUpdateQuantity: (id: string, change: number) => Promise<void>;
  updatingItemId: string | null;
};

export type CartListProps = {
  items: CartItemUI[];
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, change: number) => Promise<void>;
  updatingItemId: string | null;
};

export type OrderSummaryProps = {
  subtotal: number;
  total: number;
  cart?: {
    discountCodes?: { code: string }[];
    totalPrice?: { centAmount: number };
  };
};
