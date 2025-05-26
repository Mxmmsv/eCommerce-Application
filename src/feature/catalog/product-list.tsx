import type { Product } from '@commercetools/platform-sdk';

import { ProductComponent } from './product-component';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return <div className="py-32 text-center">No products found</div>;
  }

  return (
    <section className="py-32">
      <div className="container flex flex-col gap-16 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {products.map((product) => (
            <ProductComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProductList };
