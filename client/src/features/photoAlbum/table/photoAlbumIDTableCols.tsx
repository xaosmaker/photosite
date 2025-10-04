"use client";
import { ImageType } from "@/types/imageType";
import { ColumnDef } from "@tanstack/react-table";
import ShowImageOnTable from "../components/ShowImageOnTable";
import ActionsMenuOnTable from "../components/ActionsMenuOnTable";

export const photoAlbumIDTableCol: ColumnDef<ImageType>[] = [
  {
    accessorKey: "images",
    header: "Photos",
    cell: ({ row: { original } }) => {
      if (original?.src) {
        return <ShowImageOnTable src={original.src} alt={original.alt} />;
      }
      return <div>No Image</div>;
    },
  },
  {
    accessorKey: "pkid",
    header: "ID",
  },

  {
    accessorKey: "isCover",
    header: "Is Cover",
  },
  {
    accessorKey: "isShown",
    header: "Is Shown",
  },
  {
    id: "photoAlbumIDHeader",
    header: "Actions",
    cell: () => {
      return <ActionsMenuOnTable />;
    },
  },
];
