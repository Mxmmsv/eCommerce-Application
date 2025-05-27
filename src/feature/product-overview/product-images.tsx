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
      <div className="flex aspect-square items-center justify-center p-6">
        <img
          src={image[0].url}
          alt={alt}
          className="h-full w-full rounded-2xl bg-white object-cover"
        />
      </div>
    );
  }

  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {image.map((image, index) => (
          <CarouselItem key={index} className="flex aspect-square items-center justify-center p-6">
            <img
              src={image.url}
              alt={alt}
              className="h-full w-full rounded-2xl bg-white object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
