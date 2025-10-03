"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Carousel from "./Carousel";
import { ImageType } from "@/types/imageType";

export default function Modal({ images }: { images: ImageType[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">All Photos</Button>
      </DialogTrigger>
      <DialogContent className="h-full w-full">
        <DialogTitle></DialogTitle>
        <Carousel images={images} />
      </DialogContent>
    </Dialog>
  );
}
