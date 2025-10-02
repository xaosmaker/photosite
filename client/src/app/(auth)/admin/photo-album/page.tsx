import { getCategories } from "@/features/categories/fetchers";
import { CategoryResponse } from "@/features/categories/types/catTypes";
import { getAllPhotoAlbums } from "@/features/photoAlbum/photoAlbumFetchers";
import PhotoTable from "@/features/photoAlbum/components/photoTable";
import { PhotoAlbumResponse } from "@/features/photoAlbum/photoAlbumTypes";
import { ImageType } from "@/features/images/imagesTypes";

export default async function Page() {
  const categoriesData: Array<CategoryResponse> = await getCategories();
  console.log(categoriesData);

  const categoriesRender = categoriesData.map((cat) => {
    return { label: cat.categoryName, value: cat.pkid.toString() };
  });
  const photoAlbums: PhotoAlbumResponse<ImageType>[] =
    await getAllPhotoAlbums();

  return (
    <>
      <div className="container mx-auto rounded-xl border border-neutral-700 px-4 py-4">
        <h2 className="text-center text-2xl">Photo Albums</h2>
        <PhotoTable<ImageType>
          categoriesRender={categoriesRender}
          photoAlbums={photoAlbums}
        />
      </div>
    </>
  );
}
