import { Euro, RussianRuble } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@/lib/utils';

import { useSavePageOnClick } from './back-button/use-save-page-on-click';
import type { Poster } from './types';

type Props = {
  poster: Poster;
  currentPage: number;
};

const ProductComponent = ({ poster, currentPage }: Props) => {
  const PriceIcon = poster.currencyCode === 'EUR' ? Euro : RussianRuble;

  const handleClick = useSavePageOnClick(currentPage);

  return (
    <div
      key={poster.id}
      className={cn(
        'group/texthover group/cardhover hover:bg-popover/55',
        'flex flex-col overflow-visible transition-colors duration-200 hover:rounded-sm',
        'shadow-chart-3/75 my-4 rounded-sm shadow-[-8px_8px_16px_-5px]',
      )}
    >
      <Link to={`/catalog/product/${poster.id}`} onClick={handleClick}>
        <div>
          <div className="aspect-[2/3] h-full overflow-hidden rounded-t-sm rounded-b-xs">
            <img
              src={poster.image}
              alt={poster.name}
              className={cn(
                'h-full w-full object-cover object-center px-0',
                'rounded-t-sm transition-all duration-500',
                'group-hover/cardhover:scale-105 lg:group-hover/cardhover:-translate-y-3 lg:group-hover/cardhover:scale-105',
              )}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-product.webp';
              }}
            />
          </div>
          <div
            className={cn(
              'flex h-full flex-grow flex-col justify-between',
              'p-4 sm:px-4 sm:pt-3 md:px-5 md:pt-4 lg:py-5',
              'min-h-[232px]',
              'transition-colors duration-200 hover:rounded-b-sm',
            )}
          >
            <div>
              <h3
                className={cn(
                  'text-center text-lg font-semibold',
                  'mb-2 sm:text-xl',
                  'group-hover/texthover:text-chart-3 transition-colors duration-200',
                  'sm:mt-3 lg:mt-0',
                )}
              >
                {poster.name}
              </h3>
              <p
                className={cn(
                  'text-muted-foreground line-clamp-2 flex justify-end',
                  'text-sm sm:text-base md:mb-3 lg:mb-3',
                )}
              >
                {poster.productTypeName}
              </p>
              <p className={cn('line-clamp-2', 'text-sm sm:text-base')}>{poster.description}</p>
            </div>
            <div className="mt-auto flex flex-row-reverse pt-4">
              {poster.hasDiscount ? (
                <div className="flex-end flex flex-row-reverse items-baseline gap-2">
                  <span
                    className={cn(
                      'text-base font-bold',
                      'sm:text-lg',
                      'group-hover/texthover:text-chart-3 transition-colors duration-200',
                    )}
                  >
                    <PriceIcon className="inline h-4 w-4" />
                    {poster.discount}
                  </span>
                  <span
                    className={cn('text-muted-foreground line-through', 'text-sm sm:text-base')}
                  >
                    <PriceIcon className="inline h-3 w-3" />
                    {poster.price}
                  </span>
                  <span className="text-xs font-medium text-green-600">
                    Save {poster.discountPercent}%
                  </span>
                </div>
              ) : (
                <span
                  className={cn(
                    'text-base font-bold',
                    'sm:text-lg',
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
