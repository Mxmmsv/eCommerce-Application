import { ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router';

import { cn } from '@/lib/utils';

type CartIconWithBadgeProps = {
  count?: number;
  className?: string;
};

export function CartIconWithBadge({ count = 0, className }: CartIconWithBadgeProps) {
  return (
    <NavLink
      to="/cart"
      className={cn(
        'hover:text-chart-3 relative p-3 transition-colors duration-300 lg:p-2',
        className,
      )}
    >
      <ShoppingCart strokeWidth={1.5} size={32} className="max-sm:size-6" />

      {count > 0 && (
        <span className="absolute top-1.5 right-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs leading-none font-bold text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </NavLink>
  );
}
