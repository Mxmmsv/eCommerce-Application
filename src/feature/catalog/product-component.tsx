<<<<<<< HEAD
<<<<<<< HEAD
import { Link } from 'react-router';

import type { Poster } from './types';

const ProductComponent = ({ poster }: { poster: Poster }) => {
  return (
    <div key={poster.id} className="bg-background border-border flex flex-col overflow-clip border">
      <Link to={`/catalog/product/${poster.id}`}>
        <div className="px-6 py-8 md:px-6 md:py-10 lg:px-6 lg:py-8">
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <img
              src={poster.image}
              alt={poster.name}
              className="h-full w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-product.webp';
              }}
            />
          </div>
          <div>
            <h3 className="mt-3 text-lg font-semibold md:mb-3 md:text-xl lg:mb-3 lg:text-base">
              {poster.name}
            </h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">{poster.description}</p>
          </div>
        </div>
      </Link>
=======
import type { Product } from '@/feature/catalog/types';
=======
import type { Product } from '@commercetools/platform-sdk';
>>>>>>> da20b29 (refactor: add type from sdk, add swr)

type ProductComponentProps = {
  product: Product;
};

const ProductComponent = ({ product }: ProductComponentProps) => {
  const current = product.masterData.current;
  const name = current.name['en-GB'] || 'No name';
  const image = current.masterVariant.images?.[0]?.url || '/placeholder-product.webp';
  const description = current.description?.['en-GB'] || 'No description available';
  return (
    <div
      key={product.id}
      className="bg-background border-border flex flex-col overflow-clip border"
    >
      <div className="px-6 py-8 md:px-6 md:py-10 lg:px-6 lg:py-8">
        <div className="mb-6 md:mb-6 lg:mb-6">
          <img
            src={image}
            alt={name}
            className="aspect-3/4 w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-product.webp';
            }}
          />
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold md:mb-3 md:text-xl lg:mb-3 lg:text-xl">
            {name || 'Not available'}
          </h3>
          <p className="text-muted-foreground lg:text-lg">
            {description || 'No description available'}
          </p>
        </div>
      </div>
>>>>>>> cd0ce35 (refactor: separate the product-component)
    </div>
  );
};

export { ProductComponent };
