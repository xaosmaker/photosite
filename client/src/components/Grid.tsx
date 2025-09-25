import Image from "next/image";
import { WobbleCard } from "./ui/wobble-card";

export default function Grid({
  className,
  images,
}: {
  className?: string | undefined;
  images: string[];
}) {
  // let x = -1;
  //

  return (
    <div
      className={`grid w-full auto-rows-auto grid-cols-7 gap-3 p-2 ${className}`}
    >
      {/* lg:grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] */}
      {images.slice(0, 6).map((im, ind) => {
        {
          /* x++; */
        }
        {
          /* if (x >= 4) { */
        }
        {
          /*   x = 0; */
        }
        {
          /* } */
        }

        return (
          <WobbleCard
            key={ind}
            containerClassName={`${ind % 4 === 0 ? "col-span-3" : "col-span-2"} `}
            className="h-80"
          >
            <Image
              fill={true}
              src={im}
              className="h-full w-full object-cover"
              alt=""
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
