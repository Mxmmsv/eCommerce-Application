import { Spinner } from '@/components/ui/spiner';
import { useCartActions } from '@/feature/cart/cart-actions';
import { CartContent } from '@/feature/cart/cart-content';
import { EmptyCart } from '@/feature/cart/empty-cart';
import { mapLineItems } from '@/feature/cart/map-line-items';
import { useCartPage } from '@/feature/cart/use-cart-page';
import { useCartSummary } from '@/feature/cart/use-cart-summary';

export default function CartPage() {
  const { cart, error, isLoading } = useCartPage();
  const { handleUpdateQuantity, handleRemove, updatingItemId } = useCartActions();
  const items = cart?.lineItems ? mapLineItems(cart.lineItems) : [];
  const { subtotal, total } = useCartSummary(items);

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
