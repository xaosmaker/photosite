import { ImageType } from "@/types/imageType";
import Grid from "./Grid";
import Modal from "./Modal";
import { PhotoCarousel } from "./PhotoCarousel";

interface PhotocardTypes {
  title: string;
  description?: string;
  photos: ImageType[];
}

export default function PhotoCard({
  title,
  description,
  photos,
}: PhotocardTypes) {
  return (
    <div className="py-20 pb-40 even:bg-zinc-200">
      <h3 className="pt-10 text-center text-xl font-extrabold uppercase md:text-3xl lg:text-5xl">
        {title}
      </h3>
      <p className="mx-auto max-w-[55ch] truncate py-5 text-center sm:text-sm">
        {description}
      </p>

      <div className="mx-auto px-15 sm:px-30 lg:w-9/12">
        <PhotoCarousel images={photos} className="px-0 md:hidden" />

        <Grid images={photos} className="not-md:hidden" />
        <Modal images={photos} />
      </div>
    </div>
  );
}
