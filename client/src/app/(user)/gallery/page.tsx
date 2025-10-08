import PhotoCard from "@/features/gallery/PhotoCard";
import { getAllPhotoAlbums } from "@/features/photoAlbum/photoAlbumFetchers";
import { PhotoAlbumResponse } from "@/types/imageType";

export default async function Page() {
  const data: PhotoAlbumResponse[] = await getAllPhotoAlbums();
  return (
    <div>
      {data?.map((album) => (
        <PhotoCard
          key={album.pkid}
          title={album.title}
          description={album.description}
          photos={album.images}
        />
      ))}
    </div>
  );
}
