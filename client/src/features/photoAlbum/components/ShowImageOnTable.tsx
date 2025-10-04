import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
      <DialogContent className="h-full w-full sm:max-w-full">
        <DialogTitle className="hidden">
          A cover image of the photo album
        </DialogTitle>
        <div className="relative">
          <Image
            fill
            src={src}
            className="h-full w-full object-contain"
            alt={alt}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
