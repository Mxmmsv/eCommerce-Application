import { Card } from '@/components/ui/card';
import type { CartItemUI } from '@/feature/cart/types';

import { CartItem } from './cart-item';

type CartListProps = {
  items: CartItemUI[];
  removeItem: (id: string) => void;
  updateQuantity: (id: string, change: number) => void;
};

export function CartList({ items, removeItem, updateQuantity }: CartListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden p-0">
          <CartItem item={item} removeItem={removeItem} updateQuantity={updateQuantity} />
        </Card>
      ))}
    </div>
  );
}
