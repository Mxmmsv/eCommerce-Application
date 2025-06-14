import type { Cart } from '@commercetools/platform-sdk';
import { toast } from 'sonner';

import { addLineItemToCart } from './add-line-item-to-cart';
import { getOrCreateCart } from './get-or-create-cart';

export async function addToCart(
  productId: string,
  isAuthenticated: boolean,
  token: string | null,
): Promise<Cart | undefined> {
  try {
    const cart = await getOrCreateCart(isAuthenticated, token);
    return await addLineItemToCart(cart, productId, isAuthenticated, token);
  } catch (error) {
    console.error('Failed to add to cart', error);
    toast.error('Failed to add product to cart.');
    return undefined;
  }
}
