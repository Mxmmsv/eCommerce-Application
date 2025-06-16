import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { mutate as updateCart } from 'swr';

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

import { useCartStore } from '../catalog/adding-to-cart/use-cart-store';

import { clearCart } from './api/api-clear-cart';

export function ClearCartButton({
  onStateChange,
}: {
  onStateChange: (isRemoving: boolean) => void;
}) {
  const { clearCart: clearStoreCart } = useCartStore();

  const handleClear = async () => {
    onStateChange(true);
    try {
      await clearCart();
      clearStoreCart();
      void updateCart('cart');
      toast.success('Cart cleared successfully!');
    } catch (error) {
      toast.error('Failed to clear cart');
      console.error('Clear cart error:', error);
    } finally {
      onStateChange(false);
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void handleClear()}
              className="bg-chart-3 hover:bg-chart-3/90"
            >
              Remove posters
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
