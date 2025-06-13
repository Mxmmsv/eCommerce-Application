import { Spinner } from '@/components/ui/spiner';
import { useCartActions } from '@/feature/cart/cart-actions';
import { CartContent } from '@/feature/cart/cart-content';
import { EmptyCart } from '@/feature/cart/empty-cart';
import { mapLineItems } from '@/feature/cart/map-line-items';
import { useCartPage } from '@/feature/cart/use-cart-page';
import { useCartSummary } from '@/feature/cart/use-cart-summary';

export default function CartPage() {
  const { cart, error, isLoading, shippingMethod, setShippingMethod } = useCartPage();
  const { handleUpdateQuantity, handleRemove } = useCartActions();
  const items = cart?.lineItems ? mapLineItems(cart.lineItems) : [];
  const { subtotal, shipping, total, shippingMethods } = useCartSummary(items, shippingMethod);

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
      shippingMethod={shippingMethod}
      setShippingMethod={setShippingMethod}
      subtotal={subtotal}
      shipping={shipping}
      total={total}
      shippingMethods={shippingMethods}
      onRemove={() => void handleRemove}
      onUpdateQuantity={handleUpdateQuantity}
    />
  );
}
