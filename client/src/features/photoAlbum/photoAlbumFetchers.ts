import { serverURL } from "@/lib/serverURL";

export async function getAllPhotoAlbums() {
  try {
    const res = await fetch(`${serverURL}/api/photo-albums`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
