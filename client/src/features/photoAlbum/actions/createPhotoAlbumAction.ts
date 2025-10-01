"use server";
import { postRequest, postRequestFile } from "@/lib/requests";
import { PhotoAlbum } from "../photoAlbumTypes";
import { serverURL } from "@/lib/serverURL";
import { FieldValidationErronNoFormData } from "@/error/FieldValidationErrorNoFormData";

export async function createPhotoAlbumAction(
  _previousState: unknown,
  data: FormData,
) {
  // const res = await postRequest(
  //   `${serverURL}/api/photo-albums`,
  //   "application/json",
  //   data,
  // );
  const res = await postRequestFile(`${serverURL}/api/photo-albums`, data);

  if (res.status !== 201) {
    console.log(201, res);

    const resData = await res.json();
    console.log(22, resData);
    console.log(201, res, data);

    return new FieldValidationErronNoFormData<PhotoAlbum>(
      resData,
    ).serializeError();
  }
}
