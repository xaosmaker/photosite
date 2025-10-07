import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DeleteImageForm from "@/features/photoAlbum/forms/DeleteImageForm";
import { AlertCircleIcon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ photoAlbumID: string; imageID: string }>;
}) {
  const { photoAlbumID, imageID } = await params;

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Are you sure you want to delete this image?</AlertTitle>
      <AlertDescription>This action is irreversible</AlertDescription>
      <AlertDescription>
        <DeleteImageForm albumId={photoAlbumID} imageId={imageID} />
      </AlertDescription>
    </Alert>
  );
}
