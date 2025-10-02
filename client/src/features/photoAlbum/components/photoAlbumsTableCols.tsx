"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PhotoAlbumResponse } from "../photoAlbumTypes";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";

export function photoAlbumTableCol<T>(form: ReactNode) {
  const photoAlbum: ColumnDef<PhotoAlbumResponse<T>>[] = [
    {
      accessorKey: "images",
      header: "",
      cell: ({ row: { original } }) => {
        const img = original.images[0] as object;

        if (img && "src" in img) {
          return (
            <Image width={50} height={50} src={img.src as string} alt="src" />
          );
          //
        }

        return "No image Fount";
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
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger className="text-green-500">
                <CirclePlus />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Create Photo Album</DialogTitle>
                <DialogDescription>Create a photo album</DialogDescription>
                {form}
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];
  return photoAlbum;
}
