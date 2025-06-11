import { Card } from '@/components/ui/card';

import { CartItem } from './cart-item';
import type { CartListProps } from './types';

export function CartList({ items, removeItem, updateQuantity }: CartListProps) {
  console.log('[UI] Rendering cart with items:', items.length);
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
