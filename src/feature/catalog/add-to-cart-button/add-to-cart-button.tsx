import { useContext, useState } from 'react';

import { Button } from '@/components/ui/button';
import AuthContext from '@/feature/auth/login/auth-provider';
import { cn } from '@/lib/utils';

import { addToCart } from '../adding-to-cart/add-to-cart';
import { useCartStore } from '../adding-to-cart/use-cart-store';

type Props = {
  productId: string;
  className?: string;
  children?: React.ReactNode;
};

export const AddToCartButton = ({ productId, className, children }: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const isInCart = useCartStore((state) => state.isInCart(productId));
  const { IS_AUTHORIZED } = useContext(AuthContext);
  const token = localStorage.getItem('ACCESS_TOKEN_KEY');

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(productId, IS_AUTHORIZED, token);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      size="lg"
      className={cn(
        'bg-chart-3 text-primary-foreground hover:bg-chart-3/90 min-w-40',
        'items-center justify-center rounded-full transition-colors max-sm:py-2.5',
        isInCart ? 'text-card' : '',
        className,
      )}
      onClick={() => void handleAddToCart()}
      disabled={isAdding || isInCart}
    >
      {isAdding ? 'Adding...' : isInCart ? 'In Cart' : (children ?? 'Add to Cart')}
    </Button>
  );
};
