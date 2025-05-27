import type { Poster } from './types';

const ProductComponent = ({ poster }: { poster: Poster }) => {
  return (
    <div key={poster.id} className="bg-background border-border flex flex-col overflow-clip border">
      <div className="px-6 py-8 md:px-6 md:py-10 lg:px-6 lg:py-8">
        <div className="mb-6 md:mb-6 lg:mb-6">
          <img
            src={poster.image}
            alt={poster.name}
            className="aspect-3/4 w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-product.webp';
            }}
          />
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold md:mb-3 md:text-xl lg:mb-3 lg:text-xl">
            {poster.name}
          </h3>
          <p className="text-muted-foreground text-sm">{poster.description}</p>
        </div>
      </div>
    </div>
  );
};

export { ProductComponent };
