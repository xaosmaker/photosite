"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PhotoAlbumResponse } from "../photoAlbumTypes";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import ShowImageOnTable from "../components/ShowImageOnTable";
import ActionsMenuOnTable from "../components/ActionsMenuOnTable";

export const photoAlbumTableCol: ColumnDef<PhotoAlbumResponse>[] = [
  {
    accessorKey: "images",
    header: "",
    cell: ({ row: { original } }) => {
      const img = original.images[0];

      if (img?.src) {
        return <ShowImageOnTable src={img.src} alt={img.alt} />;
      }
      return <div>No Image</div>;
    },
  },
  {
    accessorKey: "pkid",
    header: "ID",
  },

  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row: { original } }) => {
      return (
        <Link href={`/admin/photo-album/${original.pkid}`}>
          {original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "isCover",
    header: "Is Conver",
  },
  {
    id: "photoAlbumHeader",
    header: ({}) => {
      return (
        <div className="flex justify-end text-green-500">
          <Link href={"/admin/photo-album/create"}>
            <CirclePlus />
          </Link>
        </div>
      );
    },
    cell: () => {
      return <ActionsMenuOnTable />;
    },
  },
];
