import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
export default function ShowImageOnTable({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Image width={50} height={50} src={src} alt={alt} />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent className="flex h-screen w-screen flex-col items-center justify-center">
            <DialogTitle className="hidden">
              A cover image of the photo album
            </DialogTitle>
            <div className="relative h-3/4 w-3/4">
              <DialogClose asChild className="absolute top-4 right-4 z-10">
                <Button>
                  <X />
                </Button>
              </DialogClose>
              <Image
                fill
                src={src}
                className="h-full w-full object-cover"
                alt={alt}
              />
            </div>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
