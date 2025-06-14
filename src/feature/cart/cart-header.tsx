import type { CartHeaderProps } from './types';

export function CartHeader({ itemsCount }: CartHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Shopping Cart</h1>
      <p className="text-muted-foreground">
        {itemsCount} {itemsCount === 1 ? 'item' : 'items'} in your cart
      </p>
    </div>
  );
}
