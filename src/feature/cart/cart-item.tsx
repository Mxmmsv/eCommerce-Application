import { Trash2, Plus, Minus, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';

import type { CartItemUI } from './types';

type CartProps = {
  item: CartItemUI;
  removeItem: (id: string) => Promise<boolean>;
  updateQuantity: (id: string, change: number) => void;
};

export function CartItem({ item, removeItem, updateQuantity }: CartProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      const success = await removeItem(item.id);
      if (success) {
        setIsRemoved(true);
        setTimeout(() => setIsRemoving(false), 500);
      }
    } finally {
      if (!isRemoved) setIsRemoving(false);
    }
  };

  if (isRemoved) return null;

  return (
    <CardContent
      className={`p-0 transition-opacity duration-300 ${isRemoving ? 'opacity-50' : 'opacity-100'}`}
    >
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => void handleRemove()}
              disabled={isRemoving}
              aria-label="Remove item"
            >
              {isRemoving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, -1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-right">
              <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
              {item.originalPrice && (
                <div className="text-muted-foreground text-sm line-through">
                  ${(item.originalPrice * item.quantity).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
