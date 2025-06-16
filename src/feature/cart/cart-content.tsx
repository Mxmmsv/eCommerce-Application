import { useState } from 'react';

import { Spinner } from '@/components/ui/spiner';

import { CartList } from './cart-list';
import { ClearCartButton } from './clear-button';
import { OrderSummary } from './order-summary';
import type { CartContentProps } from './types';

export function CartContent({
  items,
  subtotal,
  total,
  onRemove,
  onUpdateQuantity,
  updatingItemId,
}: CartContentProps) {
  const [isClearing, setIsClearing] = useState(false);

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <title>{'Cart :: Poster store'}</title>
      {isClearing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Spinner size="medium" className="text-primary" />
        </div>
      )}

      <div
        className={`grid grid-cols-1 gap-8 transition-opacity lg:grid-cols-3 ${
          isClearing ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <div className="space-y-6 lg:col-span-2">
          <ClearCartButton onStateChange={setIsClearing} />
          <CartList
            items={items}
            removeItem={onRemove}
            updateQuantity={onUpdateQuantity}
            updatingItemId={updatingItemId}
          />
        </div>
        <div className="space-y-6">
          <OrderSummary subtotal={subtotal} total={total} />
        </div>
      </div>
    </div>
  );
}
