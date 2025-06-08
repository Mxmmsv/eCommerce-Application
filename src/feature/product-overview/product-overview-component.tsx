import { Euro, RussianRuble } from 'lucide-react';
import { useState, useContext } from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spiner';
import AuthContext from '@/feature/auth/login/auth-provider';
import { addToCart } from '@/feature/catalog/adding-to-cart/cart-actions';
import { cn } from '@/lib/utils';

import { useCartStore } from '../catalog/adding-to-cart/use-cart-store';

import { ProductImages } from './product-images';
import { useProductOverview } from './use-product-overview';

export default function ProductOverview({ productId }: { productId: string }) {
  const { isLoading, error, ...product } = useProductOverview(productId);
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = useCartStore((state) => state.isInCart(productId));
  const { IS_AUTHORIZED } = useContext(AuthContext);
  const token = localStorage.getItem('ACCESS_TOKEN_KEY');

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
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-center text-red-500">{error.message || 'Failed to load products'}</div>
      </div>
    );
  }

  const PriceIcon = product.currencyCode === 'EUR' ? Euro : RussianRuble;

  async function handleAddToCart() {
    setIsAdding(true);
    try {
      await addToCart(productId, IS_AUTHORIZED, token);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductImages
          images={product.images}
          alt={product.alt}
          description={product.description}
        />

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
                <span className="text-sm font-medium text-green-600">
                  Save {product.discountPercent}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="mt-8 flex gap-4">
            <Button
              size="lg"
              className={cn(
                'flex-1 transition-colors',
                isInCart ? 'bg-chart-3 text-card hover:bg-chart-3/80' : '',
              )}
              onClick={() => {
                void handleAddToCart();
              }}
              disabled={isAdding}
            >
              {isAdding ? 'Adding...' : isInCart ? 'In Cart' : 'Add to Cart'}
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
