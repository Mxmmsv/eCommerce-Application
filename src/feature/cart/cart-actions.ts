import { useState } from 'react';
import { toast } from 'sonner';
import { mutate as updateCart } from 'swr';

import { clearCart } from '@/feature/cart/api/api-clear-cart';

import { removeItemFromCart } from './api/api-delete-item-cart';
import { fetchCart } from './api/api-fetch-cart';
import { updateItemQuantity } from './api/api-update-item-quantity';

export const useCartActions = () => {
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleUpdateQuantity = async (lineItemId: string, change: number) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const cart = await fetchCart();
      const currentItem = cart.lineItems.find((item) => item.id === lineItemId);
      if (!currentItem) return;
      const newQuantity = currentItem.quantity + change;
      if (newQuantity < 1) return;
      await updateItemQuantity(lineItemId, newQuantity);
      await updateCart('cart');
    } catch (error) {
      toast.error('Failed to update quantity. Try again later');
      console.error('Update quantity error:', error);
    }
  };
  return { handleClearCart, handleRemove, handleUpdateQuantity };
};
