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
      <div className="grid grid-cols-5 grid-rows-4">
        <Dialog>
          <div className="col-span-3 col-start-2 row-span-4 row-start-1">
            <DialogTrigger asChild>
              <div className="flex aspect-square items-center justify-center">
                <img
                  src={image[0].url}
                  alt={alt}
                  loading="lazy"
                  decoding="sync"
                  className="h-full w-full cursor-zoom-in rounded-2xl bg-white object-contain"
                />
              </div>
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogTitle hidden>{alt}</DialogTitle>
            <DialogDescription hidden>{description}</DialogDescription>
            <div className="flex items-center justify-center">
              <img src={image[0].url} alt={alt} loading="lazy" decoding="sync" />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 grid-rows-4">
      <Carousel className="col-span-3 col-start-2 row-span-4 row-start-1">
        <CarouselContent>
          {imageArr.map((image, index) => (
            <CarouselItem key={index} className="flex aspect-square items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={image.url}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="bg-muted-foreground h-full w-full cursor-zoom-in rounded-2xl object-contain"
                  />
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle hidden>{alt}</DialogTitle>
                  <DialogDescription hidden>{description}</DialogDescription>

                  <Carousel>
                    <CarouselContent>
                      {imageArr.map((image, index) => (
                        <CarouselItem key={index} className="flex items-center justify-center">
                          <img src={image.url} alt={alt} loading="lazy" decoding="async" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="col-start-1 row-span-4 row-start-1" variant="secondary" />
        <CarouselNext className="col-start-5 row-span-4" variant="secondary" />
      </Carousel>
    </div>
  );
}
