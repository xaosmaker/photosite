import { getCategories } from "@/features/categories/fetchers";
import { CategoryResponse } from "@/features/categories/types/catTypes";
import CreatePhotoAlbumForm from "@/features/photoAlbum/forms/CreatePhotoAlbumForm";
import { PhotoAlbumResponse } from "@/features/photoAlbum/photoAlbumTypes";
import { serverURL } from "@/lib/serverURL";

export default async function Page({
  params,
}: {
  params: Promise<{ photoAlbumID: string }>;
}) {
  const { photoAlbumID } = await params;
  const res = await fetch(`${serverURL}/api/photo-albums/${photoAlbumID}`);
  const [data]: PhotoAlbumResponse[] = await res.json();

  const categoriesData: Array<CategoryResponse> = await getCategories();

  const categoriesRender = categoriesData.map((cat) => {
    return { label: cat.categoryName, value: cat.pkid.toString() };
  });

  return (
    <CreatePhotoAlbumForm
      editPhotoAlbumData={data}
      categories={categoriesRender}
    />
  );
}
