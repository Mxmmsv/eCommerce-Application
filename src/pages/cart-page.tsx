import { useEffect, useState } from 'react';

import { Spinner } from '@/components/ui/spiner';
import { CartList } from '@/feature/cart/cart-list';
import { OrderSummary } from '@/feature/cart/order-summary';
import type { Cart, ShippingMethod } from '@/feature/cart/types';
import { useCartStore } from '@/service/store/use-cart-store';

export default function CartPage() {
  const { cart, isLoading, error, fetchCart } = useCartStore();
  const [shippingMethod, setShippingMethod] = useState<string>('standard');

  useEffect(() => {
    void fetchCart();
  }, [fetchCart]);

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
        <div className="text-center text-red-500">{error || 'Failed to load products'}</div>
      </div>
    );
  }

  if (!cart?.lineItems.length) return <div>Empty cart</div>;

  const items: Cart[] =
    cart.lineItems.map((item) => ({
      id: item.id,
      name: item.name['en-GB'] || 'No name',
      price: item.price?.value?.centAmount ? item.price.value.centAmount / 100 : 0,
      originalPrice: item.price?.discounted?.value ? item.price.value.centAmount / 100 : undefined,
      quantity: item.quantity,
      stock: item.variant?.availability?.availableQuantity || 0,
      image: item.variant.images?.[0]?.url || '/placeholder-product.webp',
    })) || [];

  const shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 5.99,
      estimatedDays: '3-5 days',
      description: 'Free shipping on orders over $200',
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 12.99,
      estimatedDays: '1-2 days',
      description: 'Priority delivery with tracking',
    },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingMethods.find((m) => m.id === shippingMethod)?.price || 0;
  const total = subtotal + shipping;

  const handleUpdateQuantity = () => {
    // (id: string, change: number) => {
    // setItems((prev) =>
    //   prev.map((item) => {
    //     if (item.id === id) {
    //       const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + change));
    //       return { ...item, quantity: newQuantity };
    //     }
    //     return item;
    //   }),
    // );
  };

  const handleRemove = () => {
    // (id: string) => {
    // setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <title>{'Cart :: Poster store'}</title>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <CartList items={items} removeItem={handleRemove} updateQuantity={handleUpdateQuantity} />
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
