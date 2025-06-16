import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';
import { fetchShippingMethods } from '@/feature/cart/api/api-fetch-shipping-methods';
import { useCartActions } from '@/feature/cart/cart-actions';
import { CartContent } from '@/feature/cart/cart-content';
import { EmptyCart } from '@/feature/cart/empty-cart';
import { mapLineItems } from '@/feature/cart/map-line-items';
import type { ShippingMethod } from '@/feature/cart/types';
import { useCartPage } from '@/feature/cart/use-cart-page';
import { useCartSummary } from '@/feature/cart/use-cart-summary';

export default function CartPage() {
  const { cart, error, isLoading, shippingMethod, setShippingMethod } = useCartPage();
  const { handleUpdateQuantity, handleRemove, updatingItemId } = useCartActions();
  const items = cart?.lineItems ? mapLineItems(cart.lineItems) : [];
  const { data: shippingMethods = [] } = useSWR<ShippingMethod[]>(
    'shipping-methods',
    fetchShippingMethods,
    { revalidateOnFocus: false },
  );
  const { subtotal, total } = useCartSummary(items, cart);

  if (isLoading) {
    return (
      <div className="column flex min-h-svh items-center justify-center">
        <Spinner size="medium" className="text-primary">
          <span className="text-center">Loading cart...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-center text-red-500">{error.message || 'Failed to load products'}</div>
      </div>
    );
  }

  if (items.length === 0) return <EmptyCart />;

  return (
    <CartContent
      items={items}
      subtotal={subtotal}
      total={total}
      onRemove={handleRemove}
      onUpdateQuantity={handleUpdateQuantity}
      updatingItemId={updatingItemId}
    />
  );
}
