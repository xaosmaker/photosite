"use client";
import { ImageType } from "@/types/imageType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function PageCarousel({
  images,
  imageId,
}: {
  images: ImageType[];
  imageId: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const ind = images.findIndex((img) => img.pkid === imageId || 0);
    return ind === -1 ? 0 : ind;
  });

  useEffect(() => {
    const pathnameList = pathname.split("/");
    pathnameList[pathnameList.length - 1] =
      images[currentIndex].pkid.toString();

    const newPathName = pathnameList.join("/");
    if (newPathName !== pathname) {
      router.replace(newPathName);
    }
  }, [currentIndex, pathname, images, router]);

  function nextImage() {
    if (currentIndex + 1 >= images.length) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((num) => (num += 1));
  }
  function previousImage() {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(images.length - 1);
      return;
    }
    setCurrentIndex((num) => (num -= 1));
  }
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <div className="absolute top-20 left-20">
        {currentIndex + 1} of {images.length}
      </div>
      <div className="flex h-11/12 w-11/12 items-center justify-center">
        <Button
          onClick={previousImage}
          className="absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2"
        >
          <ArrowBigLeft />
        </Button>
        <Button
          onClick={nextImage}
          className="absolute top-1/2 right-0 -translate-1/2"
        >
          <ArrowBigRight />
        </Button>
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          width={images[currentIndex].width}
          height={images[currentIndex].height}
          className="max-h-full max-w-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
