import type { ProductProjection } from '@commercetools/platform-sdk';

import { mapToProduct } from '@/feature/catalog/api/map-products';

type ProductComponentProps = {
  product: ProductProjection;
};

const ProductComponent = ({ product }: ProductComponentProps) => {
  const mappedProduct = mapToProduct(product);

  return (
    <div
      key={mappedProduct.id}
      className="bg-background border-border flex flex-col overflow-clip border"
    >
      <div className="px-6 py-8 md:px-6 md:py-10 lg:px-6 lg:py-8">
        <div className="mb-6 md:mb-6 lg:mb-6">
          <img
            src={mappedProduct.image}
            alt={mappedProduct.name}
            className="aspect-3/4 w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-product.webp';
            }}
          />
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold md:mb-3 md:text-xl lg:mb-3 lg:text-xl">
            {mappedProduct.name}
          </h3>
          <p className="text-muted-foreground text-sm">{mappedProduct.description}</p>
        </div>
      </div>
    </div>
  );
};

export { ProductComponent };
