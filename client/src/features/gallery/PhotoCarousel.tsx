"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PhotoAlbumResponse } from "@/types/imageType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export function PhotoCarousel({
  album,
  className,
}: {
  album: PhotoAlbumResponse;
  className?: string | undefined;
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
          {album.images.map((im) => (
            <CarouselItem
              key={im.pkid}
              className="relative aspect-[3/4] h-full w-full"
            >
              <Link href={`/gallery/${album.pkid}/${im.pkid}`}>
                <Image
                  src={im.src}
                  className="h-full w-full object-cover"
                  alt={im.alt}
                  width={im.width}
                  height={im.height}
                />
              </Link>
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
