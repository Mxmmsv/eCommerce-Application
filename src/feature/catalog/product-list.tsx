import { ProductComponent } from './product-component';
import type { Poster } from './types';

type ProductListProps = {
  products: Poster[];
};

const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return <div className="py-32 text-center">No products found</div>;
  }

  return (
    <section className="py-6">
      <div className="container flex flex-col gap-16 sm:px-4 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((poster) => (
            <ProductComponent key={poster.id} poster={poster} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProductList };
