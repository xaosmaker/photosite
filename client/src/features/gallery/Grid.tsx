import Image from "next/image";
import { WobbleCard } from "@/components/ui/wobble-card";
import { PhotoAlbumResponse } from "@/types/imageType";
import Link from "next/link";

export default function Grid({
  album,
  className,
}: {
  album: PhotoAlbumResponse;
  className?: string | undefined;
}) {
  // let x = -1;
  //

  const renderedImages = album.images.slice(0, 6);
  return (
    <div
      className={`grid w-full auto-rows-auto grid-cols-7 gap-3 p-2 ${className}`}
    >
      {renderedImages.map((im, ind) => {
        return (
          <WobbleCard
            key={im.pkid}
            containerClassName={`${ind % 4 === 0 ? "col-span-3" : "col-span-2"} `}
            className="h-80"
          >
            <Link href={`/gallery/${album.pkid}/${im.pkid}`}>
              <Image
                fill={true}
                src={im.src}
                className="h-full w-full object-cover"
                alt={im.alt}
              />
            </Link>
          </WobbleCard>
        );
      })}
      <div className="col-span-full justify-self-end capitalize">
        {renderedImages.length} of {album.images.length} photos
      </div>
    </div>
  );
}
