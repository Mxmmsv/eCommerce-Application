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

              <DialogContent className="max-h-[90vh] max-w-[50vw] p-5">
                <DialogTitle className="flex items-center justify-center">{alt}</DialogTitle>
                <DialogDescription className="mb-4 flex items-center justify-center">
                  {description}
                </DialogDescription>
                <Carousel className="w-full">
                  <CarouselContent>
                    {imageArr.map((image, index) => (
                      <CarouselItem key={index} className="flex items-center justify-center">
                        <div className="flex aspect-square max-h-[70vh] w-full items-center justify-center">
                          <img
                            src={image.url}
                            alt={alt}
                            loading="lazy"
                            decoding="async"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
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
