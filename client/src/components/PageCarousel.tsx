"use client";
import { ImageType } from "@/types/imageType";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowBigLeft, ArrowBigRight, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function PageCarousel({
  images,
  imageId,
}: {
  modal?: boolean;
  images: ImageType[];
  imageId: number;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function nextImageId(index: number) {
    const pathnameList = pathname.split("/");
    pathnameList[pathnameList.length - 1] = images[index].pkid.toString();

    const newPathName = pathnameList.join("/");
    if (newPathName !== pathname) {
      router.replace(newPathName);
    }
  }

  const ind = images.findIndex((img) => img.pkid === imageId || 0);
  const index = ind === -1 ? 0 : ind;

  function nextImage() {
    const ind = index + 1 >= images.length ? 0 : index + 1;
    nextImageId(ind);
  }

  function previousImage() {
    const ind = index - 1 < 0 ? images.length - 1 : index - 1;
    nextImageId(ind);
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <div className="absolute top-20 left-20">
        {index + 1} of {images.length}
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
        <Button
          onClick={() => router.back()}
          className="absolute top-20 right-4 sm:right-10"
        >
          <X />
        </Button>
        <Image
          src={images[index].src}
          alt={images[index].alt}
          width={images[index].width}
          height={images[index].height}
          className="max-h-full max-w-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
