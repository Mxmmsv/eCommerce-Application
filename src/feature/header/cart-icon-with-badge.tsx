import { ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router';

import { useCartStore } from '../catalog/adding-to-cart/use-cart-store';

export function CartIconWithBadge() {
  const productsCount = useCartStore((state) => state.cart?.totalLineItemQuantity) ?? 0;
  return (
    <NavLink
      to="/cart"
      className="hover:text-chart-3 relative p-3 transition-colors duration-300 lg:p-2"
    >
      <ShoppingCart strokeWidth={1.5} size={32} className="max-sm:size-6" />

      {productsCount > 0 && (
        <span className="absolute top-1.5 right-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs leading-none font-bold text-white">
          {productsCount > 99 ? '99+' : productsCount}
        </span>
      )}
    </NavLink>
  );
}
