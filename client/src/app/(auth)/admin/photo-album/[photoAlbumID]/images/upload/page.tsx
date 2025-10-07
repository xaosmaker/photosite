import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddImagesToAlbum from "@/features/photoAlbum/forms/AddImagesToAlbum";

export default async function Page({
  params,
}: {
  params: Promise<{ photoAlbumID: string }>;
}) {
  const { photoAlbumID } = await params;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update album id: {photoAlbumID}</CardTitle>
      </CardHeader>
      <CardContent>
        <AddImagesToAlbum albumId={Number(photoAlbumID)} />
      </CardContent>
    </Card>
  );
}
