import { useContext, useState } from 'react';

import { Button } from '@/components/ui/button';
import AuthContext from '@/feature/auth/login/auth-provider';
import { cn } from '@/lib/utils';

import { addToCart } from '../adding-to-cart/add-to-cart';
import { useCartStore } from '../adding-to-cart/use-cart-store';

type Props = {
  productId: string;
};

export const AddToCartButton = ({ productId }: Props) => {
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
        'flex-1 transition-colors',
        isInCart ? 'bg-chart-3 text-card hover:bg-chart-3/80' : '',
      )}
      onClick={() => void handleAddToCart()}
      disabled={isAdding || isInCart}
    >
      {isAdding ? 'Adding...' : isInCart ? 'In Cart' : 'Add to Cart'}
    </Button>
  );
};
