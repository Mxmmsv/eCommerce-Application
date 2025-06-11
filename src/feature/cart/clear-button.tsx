import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { useCartActions } from './cart-actions';

export function ClearCartButton() {
  const { handleClearCart } = useCartActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = async () => {
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
    <div className="flex justify-end">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="ml-auto flex justify-end">
            <Trash2 className="mr-2 h-4 w-4" />
            Remove posters
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will completely remove all items from your cart. It cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void handleClear()}
              disabled={isLoading}
              className="bg-chart-3 hover:bg-chart-3/90"
            >
              {isLoading ? 'Clearing...' : 'Remove posters'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
