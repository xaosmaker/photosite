import { PhotoAlbumResponse } from "@/types/imageType";
import Grid from "./Grid";
import { PhotoCarousel } from "./PhotoCarousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PhotoCard({ album }: { album: PhotoAlbumResponse }) {
  return (
    <div className="py-20 pb-40 even:bg-zinc-200">
      <Link href={`/gallery/${album.pkid}`}>
        <h3 className="pt-10 text-center text-xl font-extrabold uppercase md:text-3xl lg:text-5xl">
          {album.title}
        </h3>
        <p className="mx-auto max-w-[55ch] truncate py-5 text-center sm:text-sm">
          {album.description}
        </p>
      </Link>
      <div className="mx-auto max-w-8/12 sm:max-w-10/12 md:max-w-9/12 xl:max-w-7/12">
        <PhotoCarousel album={album} className="px-0 md:hidden" />

        <Grid album={album} className="not-md:hidden" />
        <Button className="" asChild>
          <Link href={`/gallery/${album.pkid}`}> All Images</Link>
        </Button>
      </div>
    </div>
  );
}
