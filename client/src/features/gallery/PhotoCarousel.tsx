"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageType } from "@/types/imageType";
import { useEffect, useState } from "react";
export function PhotoCarousel({
  images,
  className,
}: {
  className?: string | undefined;
  images: ImageType[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel
        className={`mx-auto max-w-full ${className}`}
        opts={{ loop: true }}
        setApi={setApi}
      >
        <CarouselContent>
          {images.map((im, index) => (
            <CarouselItem key={index}>
              <img
                src={im.src}
                className="h-full w-full object-cover"
                alt={im.alt}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
        <div className="mt-3 text-right">
          {current} from {count} photos
        </div>
      </Carousel>
    </>
  );
}
