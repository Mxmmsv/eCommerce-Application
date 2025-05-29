import { Euro, RussianRuble } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@/lib/utils';

import type { Poster } from './types';

const ProductComponent = ({ poster }: { poster: Poster }) => {
  const PriceIcon = poster.currencyCode === 'EUR' ? Euro : RussianRuble;
  const hasDiscount = poster.discount && poster.discount !== poster.price;
  const discountPercent = hasDiscount
    ? Math.round(((Number(poster.price) - Number(poster.discount)) / Number(poster.price)) * 100)
    : 0;

  return (
    <div key={poster.id} className="bg-background border-border flex flex-col overflow-clip border">
      <Link to={`/catalog/${poster.id}`}>
        <div className="px-6 py-8 md:px-6 md:py-10 lg:px-6 lg:py-8">
          <div className="group relative aspect-[2/3] w-full overflow-hidden">
            <img
              src={poster.image}
              alt={poster.name}
              className={cn(
                'h-full w-full object-contain',
                'transition-transform duration-300 hover:scale-150',
              )}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-product.webp';
              }}
            />
          </div>
          <div className="group/texthover">
            <div>
              <h3
                className={cn(
                  'mt-3 text-lg font-semibold md:mb-3 md:text-xl lg:mb-3 lg:text-base',
                  'group-hover/texthover:text-chart-3 transition-colors duration-200',
                )}
              >
                {poster.name}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">{poster.description}</p>
            </div>
            <div className="mt-4">
              {hasDiscount ? (
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      'text-foreground text-lg font-bold',
                      'group-hover/texthover:text-chart-3 transition-colors duration-200',
                    )}
                  >
                    <PriceIcon className="inline h-4 w-4" />
                    {poster.discount}
                  </span>
                  <span className="text-muted-foreground text-sm line-through">
                    <PriceIcon className="inline h-3 w-3" />
                    {poster.price}
                  </span>
                  <span className="text-xs font-medium text-green-600">
                    Save {discountPercent}%
                  </span>
                </div>
              ) : (
                <span
                  className={cn(
                    'text-foreground text-lg font-bold',
                    'group-hover/texthover:text-chart-3 transition-colors duration-200',
                  )}
                >
                  <PriceIcon className="inline h-4 w-4" />
                  {poster.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export { ProductComponent };
