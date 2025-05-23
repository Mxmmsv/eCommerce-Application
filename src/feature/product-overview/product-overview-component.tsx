import { Euro, RussianRuble } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useProductOverview } from './use-product-overview-component';

export default function ProductOverview({ productId }: { productId: string }) {
  const {
    productImage,
    productName,
    productPrice,
    productCurrencyCode,
    productDescription,
    productDiscount,
    loading,
    error,
  } = useProductOverview(productId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const PriceIcon = productCurrencyCode === 'EUR' ? Euro : RussianRuble;
  const original = Number(productPrice);
  const discounted = Number(productDiscount);
  const discountPercent =
    original > discounted ? Math.round(((original - discounted) / original) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
          <img
            src={productImage}
            alt="Product"
            width={700}
            height={700}
            className="h-full w-full rounded-2xl bg-white object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl font-bold">{productName}</h1>

          <div className="mb-6 flex items-baseline gap-4">
            <span className="text-foreground text-2xl font-bold">
              <PriceIcon className="inline h-5 w-5" />
              {productDiscount}
            </span>
            {productDiscount !== productPrice && (
              <>
                <span className="text-muted-foreground text-lg line-through">
                  <PriceIcon className="inline h-5 w-5" />
                  {productPrice}
                </span>
                <span className="text-sm font-medium text-green-600">Save {discountPercent}%</span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{productDescription}</p>

          <div className="mt-8 flex gap-4">
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
