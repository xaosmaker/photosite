import { getCategories } from "@/features/categories/fetchers";
import { CategoryResponse } from "@/features/categories/types/catTypes";
import CreatePhotoAlbumForm from "@/features/photoAlbum/forms/CreatePhotoAlbumForm";

export default async function Page() {
  const categoriesData: Array<CategoryResponse> = await getCategories();

  const categoriesRender = categoriesData.map((cat) => {
    return { label: cat.categoryName, value: cat.pkid.toString() };
  });
  return (
    <div>
      <CreatePhotoAlbumForm categories={categoriesRender} />
    </div>
  );
}
