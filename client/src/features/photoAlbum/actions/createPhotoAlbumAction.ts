"use server";
import { postRequestFile } from "@/lib/requests";
import { PhotoAlbum } from "../photoAlbumTypes";
import { serverURL } from "@/lib/serverURL";
import { FieldValidationErronNoFormData } from "@/error/FieldValidationErrorNoFormData";
import { redirect } from "next/navigation";

export async function createPhotoAlbumAction(
  _previousState: unknown,
  data: FormData,
) {
  const res = await postRequestFile(`${serverURL}/api/photo-albums`, data);

  if (res.status !== 201) {
    const resData = await res.json();

    return new FieldValidationErronNoFormData<PhotoAlbum>(
      resData,
    ).serializeError();
  }
  return redirect("/admin/photo-album");
}
