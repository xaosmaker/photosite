"use client";
import { DataTable } from "@/components/data-table";
import CreatePhotoAlbumForm from "../forms/CreatePhotoAlbumForm";
import { photoAlbumTableCol } from "./photoAlbumsTableCols";
import { PhotoAlbumResponse } from "../photoAlbumTypes";

export default function PhotoTable<T>({
  categoriesRender,
  photoAlbums,
}: {
  categoriesRender: Array<{ value: string; label: string }>;
  photoAlbums: PhotoAlbumResponse<T>[];
}) {
  return (
    <DataTable
      columns={photoAlbumTableCol<T>(
        <CreatePhotoAlbumForm categories={categoriesRender} />,
      )}
      data={photoAlbums}
    />
  );
}
