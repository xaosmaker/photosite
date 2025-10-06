"use server";
import { postRequestFile, putRequest } from "@/lib/requests";
import { ImageForm, PhotoAlbum } from "../photoAlbumTypes";
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

export async function putPhotoAlbumAction(
  _previousState: unknown,
  data: FormData,
) {
  const pkid = data.get("pkid");
  const payload = Object.fromEntries(data.entries());

  const res = await putRequest(
    `${serverURL}/api/photo-albums/${pkid}`,
    "application/json",
    payload,
  );

  if (res.status !== 200) {
    const resData = await res.json();

    return new FieldValidationErronNoFormData<PhotoAlbum>(
      resData,
    ).serializeError();
  }
  return redirect(`/admin/photo-album/${pkid}`);
}
export async function updateImageDetaild(
  _previousState: unknown,
  data: ImageForm,
) {
  const res = await putRequest(
    `${serverURL}/api/images/${data.pkid}`,
    "application/json",
    data,
  );

  if (res.status !== 200) {
    const resData = await res.json();
    return new FieldValidationErronNoFormData<PhotoAlbum>(
      resData,
    ).serializeError();
  }

  return redirect(`/admin/photo-album`);
}
