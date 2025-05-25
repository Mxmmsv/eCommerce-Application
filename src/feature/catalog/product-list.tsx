<<<<<<< HEAD
import { ProductComponent } from './product-component';
import type { Poster } from './types';

type ProductListProps = {
  products: Poster[];
=======
import type { Product } from '@/feature/catalog/types';

import { ProductComponent } from './product-component';

type ProductListProps = {
  products: Product[];
>>>>>>> cd0ce35 (refactor: separate the product-component)
};

const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return <div className="py-32 text-center">No products found</div>;
  }

  return (
<<<<<<< HEAD
    <section className="py-6">
      <div className="container flex flex-col gap-16 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {products.map((poster) => (
            <ProductComponent key={poster.id} poster={poster} />
=======
    <section className="py-32">
      <div className="container flex flex-col gap-16 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {products.map((product) => (
            <ProductComponent key={product.id} product={product} />
>>>>>>> cd0ce35 (refactor: separate the product-component)
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProductList };
