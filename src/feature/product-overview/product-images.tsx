import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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
          className="h-full w-full rounded-2xl bg-white object-contain"
        />
      </div>
    );
  }

  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {image.map((image, index) => (
          <CarouselItem key={index} className="flex aspect-square items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="h-full w-full cursor-zoom-in rounded-2xl bg-transparent p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={image.url}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="bg-muted-foreground h-full w-full object-contain"
                  />
                </button>
              </DialogTrigger>

              <DialogContent className="h-full w-full">
                <img
                  src={image.url}
                  alt={alt}
                  className="h-full w-full rounded-xl object-contain"
                />
              </DialogContent>
            </Dialog>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        className="top-1/2 left-2 z-10 -translate-y-1/2 transform"
        variant="secondary"
      />
      <CarouselNext
        className="top-1/2 right-2 z-10 -translate-y-1/2 transform"
        variant="secondary"
      />
    </Carousel>
  );
}
