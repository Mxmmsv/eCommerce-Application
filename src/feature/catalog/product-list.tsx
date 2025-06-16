import { useReturnToLastPage } from './back-button/use-return-to-last-page';
import { DiscountFilter } from './filter/discount-filter';
import { PaginationControls } from './pagination/catalog-pagination';
import { ProductComponent } from './product-component';
import { SortSelect } from './sorting/sort-select';
import type { Poster } from './types';

type ProductListProps = {
  products: Poster[];
  totalProducts: number;
  currentPage: number;
  productsPerPage: number;
  onPageChange: (page: number) => void;
};

const ProductList = ({
  products,
  totalProducts,
  currentPage,
  productsPerPage,
  onPageChange,
}: ProductListProps) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  useReturnToLastPage(currentPage, onPageChange);

  return (
    <section className="py-2">
      <div className="container flex flex-col gap-8 px-4 lg:px-16">
        <div className="flex justify-end">
          <div className="mx-4 flex items-center justify-center">
            <DiscountFilter />
          </div>
          <SortSelect />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-12">
          {products.map((poster) => (
            <ProductComponent key={poster.id} poster={poster} currentPage={currentPage} />
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
