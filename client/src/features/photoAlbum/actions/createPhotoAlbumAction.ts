"use server";
import { postRequest } from "@/lib/requests";
import { PhotoAlbum } from "../photoAlbumTypes";
import { serverURL } from "@/lib/serverURL";
import { FieldValidationErronNoFormData } from "@/error/FieldValidationErrorNoFormData";

export async function createPhotoAlbumAction(
  _previousState: unknown,
  data: PhotoAlbum,
) {
  const res = await postRequest(
    `${serverURL}/api/photo-albums`,
    "application/json",
    data,
  );

  if (res.status !== 201) {
    const resData = await res.json();
    console.log(22, resData);

    return new FieldValidationErronNoFormData<PhotoAlbum>(
      resData,
    ).serializeError();
  }
}
