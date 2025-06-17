import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

import type { CartItemUI } from '../types';

import { RemoveItemButton } from './remove-item-button';

type CartProps = {
  item: CartItemUI;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, change: number) => Promise<void>;
  updatingItemId: string | null;
};

export function CartItem({ item, removeItem, updateQuantity, updatingItemId }: CartProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const isUpdating = updatingItemId === item.id;
  const isMinQuantity = item.quantity <= 1;

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeItem(item.id);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleIncrease = async () => {
    try {
      await updateQuantity(item.id, 1);
    } catch (error) {
      console.error('Increase quantity error:', error);
    }
  };

  const handleDecrease = async () => {
    try {
      await updateQuantity(item.id, -1);
    } catch (error) {
      console.error('Decrease quantity error:', error);
    }
  };

  return (
    <CardContent className={`p-0 transition-opacity ${isRemoving ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex h-full flex-row">
        <div className="relative h-auto w-32">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-product.webp';
            }}
          />
        </div>

        <div className="flex-1 p-6 pb-3">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">{item.name}</h3>
            </div>
            <RemoveItemButton onRemove={handleRemove} isRemoving={isRemoving} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => void handleDecrease()}
                disabled={isUpdating || isMinQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              {isUpdating ? (
                <div className="flex w-8 justify-center">
                  <Spinner className="h-4 w-4" />
                </div>
              ) : (
                <span className="w-8 text-center">{item.quantity}</span>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => void handleIncrease()}
                disabled={isUpdating}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-right">
              <div className="text-muted-foreground text-sm">each €{item.price.toFixed(2)}</div>
              <div className="font-medium">€{(item.price * item.quantity).toFixed(2)}</div>
              {item.originalPrice && (
                <div className="text-muted-foreground text-sm line-through">
                  €{(item.originalPrice * item.quantity).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
