import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { mutate } from 'swr';

import { Button } from '@/components/ui/button';

import { useCartActions } from './cart-actions';

export function ClearCartButton() {
  const { handleClearCart } = useCartActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    const clear = async () => {
      if (!window.confirm('Clear cart?')) return;
      setIsLoading(true);
      try {
        const success = await handleClearCart();
        if (success) {
          await mutate('cart');
        }
      } catch (error) {
        console.error('Error while cleaning:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void clear();
  };

  return (
    <div className="mb-4 flex justify-end">
      <Button variant="outline" className="mb-4 ml-auto flex" onClick={handleClick}>
        <Trash2 className="mr-2 h-4 w-4" />
        {isLoading ? 'Clearing...' : 'Remove posters'}
      </Button>
    </div>
  );
}
