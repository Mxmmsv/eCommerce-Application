import type { Product } from '@/feature/catalog/types';

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
            <div
              key={product.id}
              className="bg-background border-border flex flex-col overflow-clip border"
            >
              <div className="px-6 py-8 md:px-6 md:py-10 lg:px-6 lg:py-8">
                <div className="mb-6 md:mb-6 lg:mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-3/4 w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold md:mb-3 md:text-xl lg:mb-3 lg:text-xl">
                    {product.name || 'Not available'}
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    {product.description || 'No description available'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProductList };
