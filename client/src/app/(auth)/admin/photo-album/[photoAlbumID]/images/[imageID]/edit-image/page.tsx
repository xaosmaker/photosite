import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateImageForm from "@/features/photoAlbum/forms/UpdateImageForm";
import { serverURL } from "@/lib/serverURL";
import { ImageType } from "@/types/imageType";

export default async function page({
  params,
}: {
  params: Promise<{ imageID: string }>;
}) {
  const { imageID } = await params;
  const imageRes = await fetch(`${serverURL}/api/images/${imageID}`);
  const image: ImageType = await imageRes.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit image with ID: {image.pkid}</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateImageForm imageData={image} />
      </CardContent>
    </Card>
  );
}
