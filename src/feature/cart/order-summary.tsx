import { Package, CreditCard, Truck, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useCartStore } from '../catalog/adding-to-cart/use-cart-store';

import { useCartActions } from './cart-actions';
import type { OrderSummaryProps } from './types';

export function OrderSummary({ subtotal, total }: OrderSummaryProps) {
  const { cart } = useCartStore();
  const { handleApplyPromo, promoCode, setPromoCode, isApplying } = useCartActions();

  const originalTotal = cart?.totalPrice.centAmount || total * 100;
  const discountedTotal = cart?.totalPrice.centAmount || total * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Promo Code</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button variant="outline" onClick={() => void handleApplyPromo()} disabled={isApplying}>
              {isApplying ? 'Applying...' : 'Apply'}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          {cart?.discountCodes?.length && cart.discountCodes.length > 0 && (
            <div className="flex justify-between text-sm text-gray-500 line-through">
              <span>Original Price</span>
              <span>€{(originalTotal / 100).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span
              className={
                cart?.discountCodes?.length && cart.discountCodes.length > 0 ? 'text-green-600' : ''
              }
            >
              €{(discountedTotal / 100).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center gap-2 text-sm">
            <Package className="text-primary h-4 w-4" />
            <span>Free returns within 30 days</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="text-primary h-4 w-4" />
            <span>Secure payment</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Truck className="text-primary h-4 w-4" />
            <span>Fast delivery</span>
          </div>
        </div>

        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" />
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
