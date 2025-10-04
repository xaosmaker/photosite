import { getAllPhotoAlbums } from "@/features/photoAlbum/photoAlbumFetchers";
import { PhotoAlbumResponse } from "@/features/photoAlbum/photoAlbumTypes";
import { DataTable } from "@/components/data-table";
import { photoAlbumTableCol } from "@/features/photoAlbum/table/photoAlbumsTableCols";

export default async function Page() {
  const photoAlbums: PhotoAlbumResponse[] = await getAllPhotoAlbums();

  return (
    <>
      <div className="container mx-auto rounded-xl border border-neutral-700 px-4 py-4">
        <h2 className="text-center text-2xl">Photo Albums</h2>
        <DataTable columns={photoAlbumTableCol} data={photoAlbums} />
      </div>
    </>
  );
}
