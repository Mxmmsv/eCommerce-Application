import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import type { ProductData } from './types';

export function ProductImages({
  image,
  alt,
  description,
}: Pick<ProductData, 'image' | 'alt' | 'description'>) {
  const imageArr = image;
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
        {imageArr.map((image, index) => (
          <CarouselItem key={index} className="flex aspect-square items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="h-full w-full cursor-zoom-in p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={image.url}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="bg-muted-foreground h-full w-full rounded-2xl object-contain"
                  />
                </button>
              </DialogTrigger>

              <DialogContent className="max-h-[90vh] w-full max-w-3xl overflow-hidden p-5 sm:p-0 md:p-4">
                <DialogTitle className="text-center">{alt}</DialogTitle>
                <DialogDescription className="text-center">{description}</DialogDescription>

                <div className="flex items-center justify-center">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {imageArr.map((image, index) => (
                        <CarouselItem key={index} className="flex items-center justify-center">
                          <div className="flex aspect-square max-h-[60vh] w-full items-center justify-center sm:max-h-[70vh] md:max-h-[75vh]">
                            <img
                              src={image.url}
                              alt={alt}
                              loading="lazy"
                              decoding="async"
                              className="max-h-full max-w-full rounded-xl object-contain"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious
                      className="top-1/2 left-2 -translate-y-1/2"
                      variant="secondary"
                    />
                    <CarouselNext
                      className="top-1/2 right-2 -translate-y-1/2"
                      variant="secondary"
                    />
                  </Carousel>
                </div>
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
