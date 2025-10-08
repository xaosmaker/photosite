import { PhotoAlbumResponse } from "@/types/imageType";
import Image from "next/image";

export default function ImagesGrid({
  photoAlbum,
}: {
  photoAlbum: PhotoAlbumResponse;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {photoAlbum.images.map((img) => {
        return (
          <div
            key={img.pkid}
            className={`relative ${img.width > img.height ? "aspect-[4/3] sm:basis-5/12" : "aspect-[3/4] sm:basis-4/12"} w-full shrink-0 grow last:grow-0`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="h-full w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
