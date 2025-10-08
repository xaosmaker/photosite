import ImagesGrid from "@/components/ImagesGrid";
import { getPhotoAlbumByID } from "@/features/photoAlbum/photoAlbumFetchers";

export default async function AlbumPage({
  params,
}: {
  params: { albumId: string };
}) {
  const { albumId } = params;
  const [photoAblum] = await getPhotoAlbumByID(albumId);

  return (
    <div className="mx-auto mt-20 max-w-4xl px-4 py-8 lg:max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 uppercase drop-shadow-lg">
          {photoAblum.title || "Album"}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 italic">
          {photoAblum.description ||
            "A curated collection of beautiful moments from this album."}
        </p>
        <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400" />
      </div>
      <ImagesGrid photoAlbum={photoAblum} />
    </div>
  );
}
