import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import type { ProductData } from './types';

export function ProductImages({ image, alt }: Pick<ProductData, 'image' | 'alt'>) {
  if (image.length === 1) {
    return (
      <div className="flex aspect-square items-center justify-center">
        <img
          src={image[0].url}
          alt={alt}
          loading="lazy"
          decoding="sync"
          className="h-full w-full rounded-2xl bg-white object-cover"
        />
      </div>
    );
  }

  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {image.map((image, index) => (
          <CarouselItem key={index} className="flex aspect-square items-center justify-center">
            <img
              src={image.url}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-2xl bg-white object-cover"
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
