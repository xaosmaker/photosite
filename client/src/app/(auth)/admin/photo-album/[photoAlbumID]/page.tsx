import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ActionsMenuOnTable from "@/features/photoAlbum/components/ActionsMenuOnTable";
import { PhotoAlbumResponse } from "@/features/photoAlbum/photoAlbumTypes";
import { photoAlbumIDTableCol } from "@/features/photoAlbum/table/photoAlbumIDTableCols";
import { serverURL } from "@/lib/serverURL";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ photoAlbumID: string }>;
}) {
  const { photoAlbumID } = await params;
  const res = await fetch(`${serverURL}/api/photo-albums/${photoAlbumID}`);
  const data: PhotoAlbumResponse[] = await res.json();

  if (res.status !== 200) {
    throw new Error("Params Required");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Title: {data[0].title}</CardTitle>
        <CardDescription>Description: {data[0].description}</CardDescription>
        <CardDescription>is cover: {String(data[0].isCover)}</CardDescription>
        <CardAction className="">
          <ActionsMenuOnTable
            editAction={
              <Button asChild>
                <Link href={`/admin/photo-album/${photoAlbumID}/edit`}>
                  Edit
                </Link>
              </Button>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable columns={photoAlbumIDTableCol} data={data[0].images} />
      </CardContent>
    </Card>
  );
}
