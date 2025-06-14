import { toast } from 'sonner';
import { mutate as updateCart } from 'swr';

import { clearCart } from '@/feature/cart/api/api-clear-cart';

import { removeItemFromCart } from './api/api-delete-item-cart';

export const useCartActions = () => {
  const handleClearCart = async (): Promise<boolean> => {
    try {
      await clearCart();
      return true;
    } catch (error) {
      console.error('Clearance failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  };

  const handleRemove = async (lineItemId: string) => {
    try {
      await removeItemFromCart(lineItemId);
      await updateCart('cart');
    } catch (error) {
      toast.error('Failed to delete item. Try again later');
      console.error('Remove error:', error);
    }
  };

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
  return { handleClearCart, handleRemove, handleUpdateQuantity };
};
