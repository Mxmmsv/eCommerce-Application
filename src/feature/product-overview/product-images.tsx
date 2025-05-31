import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import type { ProductData } from './types';

export function ProductImages({ images, alt }: Pick<ProductData, 'images' | 'alt'>) {
  if (images.length === 1) {
    return (
      <div className="flex aspect-square items-center justify-center">
        <img
          src={images[0].url}
          alt={alt}
          loading="lazy"
          decoding="sync"
          className="h-full w-full rounded-2xl bg-white object-contain"
        />
      </div>
    );
  }

  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex aspect-square items-center justify-center">
            <img
              src={image.url}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="bg-muted-foreground h-full w-full rounded-2xl object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="top-1/2 left-2 -translate-y-1/2 transform"
        variant={'secondary'}
      />
      <CarouselNext className="top-1/2 right-2 -translate-y-1/2 transform" variant={'secondary'} />
    </Carousel>
  );
}
