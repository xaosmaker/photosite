"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PhotoAlbumResponse } from "./photoAlbumTypes";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { ReactNode } from "react";

export function photoAlbumTableCol(form: ReactNode) {
  const photoAlbum: ColumnDef<PhotoAlbumResponse>[] = [
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
