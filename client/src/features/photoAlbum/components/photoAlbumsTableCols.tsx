"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PhotoAlbumResponse } from "../photoAlbumTypes";
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const photoAlbumTableCol: ColumnDef<PhotoAlbumResponse>[] = [
  {
    accessorKey: "images",
    header: "",
    cell: ({ row: { original } }) => {
      const img = original.images[0];

      if (img?.src) {
        return <Image width={50} height={50} src={img.src} alt="src" />;
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
  },
];
