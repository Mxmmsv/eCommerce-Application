import type { Cart } from '@commercetools/platform-sdk';
import { toast } from 'sonner';

import { fetchCart } from '@/feature/cart/api/api-fetch-cart';

import { addLineItemToCart } from './add-line-item-to-cart';

export async function addToCart(
  productId: string,
  isAuthenticated: boolean,
  token: string | null,
): Promise<Cart | undefined> {
  try {
    const cart = await fetchCart();
    return await addLineItemToCart(cart, productId, isAuthenticated, token);
  } catch (error) {
    console.error('Failed to add to cart', error);
    toast.error('Failed to add product to cart.');
    return undefined;
  }
}
