"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Carousel from "./Carousel";

export default function Modal({ images }: { images: string[] }) {
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
