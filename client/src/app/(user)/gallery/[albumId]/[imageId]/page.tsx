import PageCarousel from "@/components/PageCarousel";
import { getPhotoAlbumByID } from "@/features/photoAlbum/photoAlbumFetchers";

export default async function page({
  params,
}: {
  params: Promise<{ albumId: string; imageId: string }>;
}) {
  const { imageId, albumId } = await params;
  const [album] = await getPhotoAlbumByID(albumId);
  return <PageCarousel images={album.images} imageId={parseInt(imageId)} />;
}
