import { useState } from 'react';
import { toast } from 'sonner';
import { mutate as updateCart } from 'swr';

import { clearCart } from '@/feature/cart/api/api-clear-cart';

import apiRoot from '../api/api-client-credentials-flow';
import { isHttpError } from '../api/errors';
import { useCartStore } from '../catalog/adding-to-cart/use-cart-store';

import { applyDiscountCode } from './api/api-apply-discount';
import { removeItemFromCart } from './api/api-delete-item-cart';
import { fetchCart } from './api/api-fetch-cart';
import { updateItemQuantity } from './api/api-update-item-quantity';

export const useCartActions = () => {
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

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
    if (updatingItemId) return;
    setUpdatingItemId(lineItemId);

    try {
      const cart = await fetchCart();
      const currentItem = cart.lineItems.find((item) => item.id === lineItemId);
      if (!currentItem) return;

      const newQuantity = currentItem.quantity + change;
      if (newQuantity < 1) return;

      await updateItemQuantity(lineItemId, newQuantity);
      await updateCart('cart');
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleApplyPromo = async () => {
    const normalizedPromoCode = promoCode.trim().toUpperCase();

    setIsApplying(true);
    try {
      await applyDiscountCode(normalizedPromoCode);
      toast.success('Promo code applied successfully');
    } catch (error) {
      let errorMessage = 'Failed to apply promo code';
      if (isHttpError(error)) {
        errorMessage = error.body?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error('The promo code is incorrect');
      console.error('Error adding promo code:', errorMessage);
    } finally {
      setIsApplying(false);
    }
  };

  const removeDiscountCode = async () => {
    try {
      const { cart } = useCartStore.getState();
      if (!cart?.id) return;

      await apiRoot
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: 'removeDiscountCode',
                discountCode: cart.discountCodes[0].discountCode,
              },
            ],
          },
        })
        .execute();
      const updatedCart = await fetchCart();
      useCartStore.getState().setCart(updatedCart);
    } catch (error) {
      console.error('Remove discount error:', error);
    }
  };

  return {
    handleClearCart,
    handleRemove,
    handleUpdateQuantity,
    updatingItemId,
    handleApplyPromo,
    promoCode,
    setPromoCode,
    isApplying,
    removeDiscountCode,
  };
};
