import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DeletePhotoAlbumForm from "@/features/photoAlbum/forms/DeletePhotoAlbumForm";
import { AlertCircleIcon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ photoAlbumID: string }>;
}) {
  const { photoAlbumID } = await params;
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Are you sure you want to delete this image?</AlertTitle>
      <AlertDescription>This action is irreversible</AlertDescription>
      <AlertDescription>
        <DeletePhotoAlbumForm albumId={photoAlbumID} />
      </AlertDescription>
    </Alert>
  );
}
