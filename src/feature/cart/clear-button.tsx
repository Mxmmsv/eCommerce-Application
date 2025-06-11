import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';

import { Button } from '@/components/ui/button';

import { useCartActions } from './cart-actions';

export function ClearCartButton() {
  const { handleClearCart } = useCartActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = async () => {
    if (!window.confirm('Clear cart?')) return;

    setIsLoading(true);
    try {
      const success = await handleClearCart();
      if (success) {
        await mutate('cart');
        toast.success('Cart cleared!', {
          description: 'All items successfully removed',
        });
      }
    } catch (error) {
      toast.error('Failed to clear cart', {
        description: 'Try again later',
      });
      console.error('Error while cleaning:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4 flex justify-end">
      <Button
        variant="outline"
        onClick={() => void handleClear()}
        disabled={isLoading}
        className="ml-auto"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {isLoading ? 'Clearing...' : 'Remove posters'}
      </Button>
    </div>
  );
}
