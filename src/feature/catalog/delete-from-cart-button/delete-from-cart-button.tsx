import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { isHttpError } from '@/feature/api/errors';
import { cn } from '@/lib/utils';

import { useCartStore } from '../adding-to-cart/use-cart-store';

type Props = {
  productId: string;
  variantId: number;
};

export const DeleteFromCartButton = ({ productId, variantId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { cart, setCart } = useCartStore();

  const lineItem = cart?.lineItems.find(
    (item) => item.productId === productId && item.variant.id === variantId,
  );

  const handleDelete = async () => {
    if (!cart || !lineItem) return;

    try {
      setIsDeleting(true);
      const apiClient = createApiClientWithToken();

      const response = await apiClient
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: lineItem.id,
              },
            ],
          },
        })
        .execute();

      setCart(response.body);
      toast.success('Product deleted from cart');
    } catch (error) {
      if (isHttpError(error)) {
        toast.error(`Failed to delete product (error ${error.statusCode})`);
      } else {
        toast.error('Unknown error while deleting item from cart');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const buttonLabel = !lineItem
    ? "Isn't in the cart"
    : isDeleting
      ? 'Deleting...'
      : 'Delete from Cart';

  const buttonClass = cn(
    'rounded-full max-sm:py-2.5 min-w-40',
    !lineItem && 'cursor-not-allowed',
    isDeleting && 'opacity-75',
  );

  return (
    <Button
      size="lg"
      variant="outline"
      disabled={!lineItem || isDeleting}
      onClick={() => {
        void handleDelete();
      }}
      className={buttonClass}
    >
      {buttonLabel}
    </Button>
  );
};
