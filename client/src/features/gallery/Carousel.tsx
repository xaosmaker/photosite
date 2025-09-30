"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Carousel({
  images,
  openImage = 0,
}: {
  images: string[];
  openImage?: number;
}) {
  const [currentImage, setCurrentImg] = useState<number>(openImage);
  function nextImage() {
    if (currentImage + 1 >= images.length) {
      setCurrentImg(0);
      return;
    }
    setCurrentImg((num) => (num += 1));
  }
  function previous() {
    if (currentImage - 1 < 0) {
      setCurrentImg(images.length - 1);
      return;
    }
    setCurrentImg((num) => (num -= 1));
  }

  return (
    <div>
      <Button
        onClick={previous}
        className="absolute top-1/2 left-0 z-20 -translate-y-1/2"
      >
        <ArrowLeft />
      </Button>

      <Button
        onClick={nextImage}
        className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
      >
        <ArrowRight />
      </Button>
      <Image
        src={images[currentImage]}
        className="h-full w-full object-contain p-4"
        alt="some"
        fill
      />
      <p className="absolute top-0">
        {currentImage + 1} of {images.length}
      </p>
    </div>
  );
}
