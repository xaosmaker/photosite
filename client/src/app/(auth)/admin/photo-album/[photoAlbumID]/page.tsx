import { DataTable } from "@/components/data-table";
import { PhotoAlbumResponse } from "@/features/photoAlbum/photoAlbumTypes";
import { photoAlbumIDTableCol } from "@/features/photoAlbum/table/photoAlbumIDTableCols";
import { serverURL } from "@/lib/serverURL";

export default async function page({
  params,
}: {
  params: Promise<{ photoAlbumID: string }>;
}) {
  const { photoAlbumID } = await params;
  const res = await fetch(`${serverURL}/api/photo-albums/${photoAlbumID}`);
  const data: PhotoAlbumResponse[] = await res.json();

  if (res.status !== 200) {
    throw new Error("Params Required");
  }

  return (
    <div className="container mx-auto rounded-xl border border-neutral-700 px-4 py-4">
      <h2 className="text-2xl">Title: {data[0].title}</h2>
      <p>Description: {data[0].description}</p>
      <DataTable columns={photoAlbumIDTableCol} data={data[0].images} />
    </div>
  );
}
