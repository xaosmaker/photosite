import Image from "next/image";
import { WobbleCard } from "@/components/ui/wobble-card";
import { ImageType } from "@/types/imageType";

export default function Grid({
  className,
  images,
}: {
  className?: string | undefined;
  images: ImageType[];
}) {
  // let x = -1;
  //

  return (
    <div
      className={`grid w-full auto-rows-auto grid-cols-7 gap-3 p-2 ${className}`}
    >
      {images.slice(0, 6).map((im, ind) => {
        return (
          <WobbleCard
            key={im.pkid}
            containerClassName={`${ind % 4 === 0 ? "col-span-3" : "col-span-2"} `}
            className="h-80"
          >
            <Image
              fill={true}
              src={im.src}
              className="h-full w-full object-cover"
              alt={im.alt}
            />
          </WobbleCard>
        );
      })}
      <div className="col-span-full justify-self-end capitalize">
        6 of {images.length} photos
      </div>
    </div>
  );
}

// <DirectionAwareHover
//   imageUrl={im}
//   key={ind}
// >
//   <p className="font-bold text-xl ">In the mountains</p>
//   <p className="font-normal text-sm">$1299 / night</p>
// </DirectionAwareHover>
