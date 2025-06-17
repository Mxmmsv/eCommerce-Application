import { PaginationControls } from './pagination/catalog-pagination';
import { ProductComponent } from './product-component';
import type { Poster } from './types';

type ProductListProps = {
  products: Poster[];
  totalProducts: number;
  currentPage: number;
  productsPerPage: number;
  onPageChange: (page: number) => void;
  isStale: boolean;
};

const ProductList = ({
  products,
  totalProducts,
  currentPage,
  productsPerPage,
  onPageChange,
  isStale,
}: ProductListProps) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <section className="py-2">
      <div className="container flex flex-col gap-8 px-4 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-12">
          {products.map((poster) => (
            <div
              key={poster.id}
              className={
                isStale
                  ? 'opacity-50 transition-opacity duration-300'
                  : 'opacity-100 transition-opacity duration-300'
              }
            >
              <ProductComponent poster={poster} />
            </div>
          ))}
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
};

export { ProductList };
