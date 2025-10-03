"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PhotoAlbumResponse } from "../photoAlbumTypes";
import { CirclePlus, EllipsisVertical, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const photoAlbumTableCol: ColumnDef<PhotoAlbumResponse>[] = [
  {
    accessorKey: "images",
    header: "",
    cell: ({ row: { original } }) => {
      const img = original.images[0];

      if (img?.src) {
        return (
          <Dialog>
            <DialogTrigger>
              <Image width={50} height={50} src={img.src} alt="src" />
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay>
                <DialogContent className="flex h-screen w-screen flex-col items-center justify-center">
                  <DialogTitle className="hidden">
                    A cover image of the photo album
                  </DialogTitle>
                  <div className="relative h-3/4 w-3/4">
                    <DialogClose
                      asChild
                      className="absolute top-4 right-4 z-10"
                    >
                      <Button>
                        <X />
                      </Button>
                    </DialogClose>
                    <Image
                      fill
                      src={img.src}
                      className="h-full w-full object-cover"
                      alt="src"
                    />
                  </div>
                </DialogContent>
              </DialogOverlay>
            </DialogPortal>
          </Dialog>
        );
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
    cell: () => {
      return (
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical />
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-4">
            <Button variant="destructive">Delete</Button>
            <Button variant="ghost">edit</Button>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
