import { Euro, RussianRuble } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useProductOverview } from './use-product-overview-component';

export default function ProductOverview({ productId }: { productId: string }) {
  const { isLoading, error, ...product } = useProductOverview(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;

  const PriceIcon = product.currencyCode === 'EUR' ? Euro : RussianRuble;
  const original = Number(product.price);
  const discounted = Number(product.discount);
  const discountPercent =
    original > discounted ? Math.round(((original - discounted) / original) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt="Product"
            width={700}
            height={700}
            className="h-full w-full rounded-2xl bg-white object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

          <div className="mb-6 flex items-baseline gap-4">
            <span className="text-foreground text-2xl font-bold">
              <PriceIcon className="inline h-5 w-5" />
              {product.discount}
            </span>
            {product.discount !== product.price && (
              <>
                <span className="text-muted-foreground text-lg line-through">
                  <PriceIcon className="inline h-5 w-5" />
                  {product.price}
                </span>
                <span className="text-sm font-medium text-green-600">Save {discountPercent}%</span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

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
