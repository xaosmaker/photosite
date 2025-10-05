"use client";
import SelectSearch from "@/components/SelectSearch";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { PhotoAlbum, PhotoAlbumResponse } from "../photoAlbumTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { photoAlbumValidators } from "../photAlbumValidators";
import DisplayZodErrors from "@/components/DisplayZodErrors";
import { useActionState, useTransition } from "react";
import {
  createPhotoAlbumAction,
  putPhotoAlbumAction,
} from "../actions/createPhotoAlbumAction";
import AddImagesForm from "./AddImagesForm";
export default function CreatePhotoAlbumForm({
  categories,
  editPhotoAlbumData,
}: {
  categories: Array<{ value: string; label: string }>;
  editPhotoAlbumData?: PhotoAlbumResponse;
}) {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(
    editPhotoAlbumData ? putPhotoAlbumAction : createPhotoAlbumAction,
    undefined,
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhotoAlbum>({
    resolver: zodResolver(photoAlbumValidators),
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      title: editPhotoAlbumData?.title || "",
      description: editPhotoAlbumData?.description || "",
      categoriesId: editPhotoAlbumData?.categoriesId.toString() || undefined,
      isCover: editPhotoAlbumData?.isCover || false,
      images: undefined,
      altText: undefined,
    },
  });

  function onsubmit(data: PhotoAlbum) {
    const formData = new FormData();
    if (!editPhotoAlbumData && data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    } else if (editPhotoAlbumData) {
      formData.append("pkid", editPhotoAlbumData.pkid.toString());
    }
    const keys = Object.keys(data) as (keyof PhotoAlbum)[];
    keys.forEach((key) => {
      if (key !== "images") {
        formData.append(key, data[key] as string);
      }
    });

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="grid gap-4">
      <SelectSearch
        name="categoriesId"
        control={control}
        defaultMessage="Select Category..."
        data={categories}
        emptyMessage="Cannot Find Category"
      />
      {errors.categoriesId?.message && (
        <DisplayZodErrors
          title="category"
          errors={[errors.categoriesId?.message]}
        />
      )}
      <div>
        <Label htmlFor="title" className="pb-2">
          Title
        </Label>
        <Input
          {...register("title")}
          type="text"
          name="title"
          id="title"
          required
        />

        {errors.title?.message && (
          <DisplayZodErrors title="Title" errors={[errors.title?.message]} />
        )}
      </div>

      <div>
        <Label htmlFor="description" className="pb-2">
          Description
        </Label>
        <Textarea
          {...register("description")}
          name="description"
          id="description"
        />

        {errors.description?.message && (
          <DisplayZodErrors
            title="category"
            errors={[errors.description?.message]}
          />
        )}
      </div>
      <div className="flex items-center gap-3">
        <Controller
          control={control}
          name="isCover"
          render={({ field: { value, onChange } }) => (
            <Checkbox checked={value} onCheckedChange={onChange} id="isCover" />
          )}
        />
        <Label htmlFor="isCover">Is Cover</Label>
      </div>
      {!editPhotoAlbumData && (
        <AddImagesForm
          control={control}
          register={register("altText")}
          name="images"
          errorTitle="Images"
          errors={errors.images?.message}
        />
      )}
      <Button disabled={isPending} type="submit">
        Submit
      </Button>
      {state?.errors.root && (
        <DisplayZodErrors title="Form" errors={state.errors.root} />
      )}
    </form>
  );
}
