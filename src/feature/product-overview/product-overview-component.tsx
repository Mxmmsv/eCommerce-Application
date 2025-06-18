import { Euro, RussianRuble } from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';

import { AddToCartButton } from '../catalog/add-to-cart-button/add-to-cart-button';
import BackButton from '../catalog/back-button/back-button';
import { DeleteFromCartButton } from '../catalog/delete-from-cart-button/delete-from-cart-button';
import SeparatorWave from '../main/separator-wave';

import { ProductImages } from './product-images';
import { useProductOverview } from './use-product-overview';

export default function ProductOverview({ productId }: { productId: string }) {
  const { isLoading, error, ...product } = useProductOverview(productId);

  if (isLoading) {
    return (
      <div className="column flex min-h-svh items-center justify-center">
        <Spinner size="medium" className="text-primary">
          <span className="text-center">Loading products...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    const message = error instanceof Error ? error.message : 'Failed to load products';
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-center text-red-500">{message}</div>
      </div>
    );
  }

  const PriceIcon = product.currencyCode === 'EUR' ? Euro : RussianRuble;

  return (
    <>
      <div className="mx-auto w-full max-w-7xl p-6">
        <BackButton />
      </div>
      <SeparatorWave top={true} color="fill-hero" />
      <div className="bg-hero">
        <div className="mx-auto w-full max-w-7xl p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ProductImages
              images={product.images}
              alt={product.alt}
              description={product.description}
            />

            <div className="flex flex-col max-md:items-center max-md:text-center">
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
                    <span className="text-sm font-medium text-green-600">
                      Save {product.discountPercent}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              <div className="mt-8 flex w-full gap-4 max-sm:flex-col">
                <AddToCartButton productId={productId} />
                <DeleteFromCartButton productId={productId} variantId={product.masterVariant.id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SeparatorWave color="fill-hero" />
    </>
  );
}
