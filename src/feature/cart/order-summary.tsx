import { Package, CreditCard, Truck, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useCartStore } from '../catalog/adding-to-cart/use-cart-store';

import { useCartActions } from './cart-actions';
import type { OrderSummaryProps } from './types';

export function OrderSummary({ total }: OrderSummaryProps) {
  const { cart } = useCartStore();
  const { handleApplyPromo, promoCode, setPromoCode, isApplying, removeDiscountCode } =
    useCartActions();

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
              disabled={isApplying || !!cart?.discountCodes?.length}
            />

            {cart?.discountCodes?.length ? (
              <Button
                variant="outline"
                onClick={() => {
                  void removeDiscountCode();
                  setPromoCode('');
                }}
                // onClick={async () => {
                //   await removeDiscountCode();
                //   setPromoCode('');
                // }}
                disabled={isApplying}
              >
                Remove
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => void handleApplyPromo()}
                disabled={isApplying || !promoCode.trim()}
              >
                {isApplying ? 'Applying...' : 'Apply'}
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {cart?.discountCodes?.length ? (
            <>
              <div className="text-muted-foreground flex justify-between line-through">
                <span>Total before discount</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-green-600">
                <span>Discounted Total</span>
                <span>€{(cart.totalPrice.centAmount / 100).toFixed(2)}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          )}
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
