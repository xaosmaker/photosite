import { serverURL } from "@/lib/serverURL";
import { PhotoAlbumResponse } from "@/types/imageType";

export async function getAllPhotoAlbums() {
  try {
    const res = await fetch(`${serverURL}/api/photo-albums`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
export async function getPhotoAlbumByID(photoAlbumID: string) {
  const res = await fetch(`${serverURL}/api/photo-albums/${photoAlbumID}`);
  const data: PhotoAlbumResponse[] = await res.json();

  if (res.status !== 200) {
    throw new Error("Something went wrong");
  }
  return data;
}
