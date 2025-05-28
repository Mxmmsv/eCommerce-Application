import type { Poster } from './types';

const ProductComponent = ({ poster }: { poster: Poster }) => {
  return (
    <div key={poster.id} className="bg-background border-border flex flex-col overflow-clip border">
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
    </div>
  );
};

export { ProductComponent };
