import { CartList } from './cart-list';
import { ClearCartButton } from './clear-button';
import { OrderSummary } from './order-summary';
import type { CartContentProps } from './types';

export function CartContent({
  items,
  shippingMethod,
  setShippingMethod,
  subtotal,
  shipping,
  total,
  shippingMethods,
  onRemove,
  onUpdateQuantity,
}: CartContentProps) {
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <title>{'Cart :: Poster store'}</title>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ClearCartButton />
          <CartList items={items} removeItem={onRemove} updateQuantity={onUpdateQuantity} />
        </div>
        <div className="space-y-6">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            shippingMethods={shippingMethods}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
          />
        </div>
      </div>
    </div>
  );
}
