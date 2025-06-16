import { Package, CreditCard, Truck, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ShippingMethods } from './shipping-methods';
import type { OrderSummaryProps } from './types';

export function OrderSummary({
  subtotal,
  total,
  shipping,
  shippingMethod,
  shippingMethods,
  setShippingMethod,
}: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order details and shipping information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ShippingMethods
          shippingMethods={shippingMethods}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />

        <div className="space-y-2">
          <Label>Promo Code</Label>
          <div className="flex gap-2">
            <Input placeholder="Enter promo code" />
            <Button variant="outline">Apply</Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>
              {!shippingMethod
                ? 'Not selected'
                : shippingMethod === 'no-shipping'
                  ? 'Free pickup'
                  : `€${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>€{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
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
