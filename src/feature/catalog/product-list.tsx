import { ProductComponent } from './product-component';
import type { Poster } from './types';

type ProductListProps = {
  products: Poster[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <section className="py-6">
      <div className="container flex flex-col gap-16 px-4 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-12">
          {products.map((poster) => (
            <ProductComponent key={poster.id} poster={poster} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProductList };
