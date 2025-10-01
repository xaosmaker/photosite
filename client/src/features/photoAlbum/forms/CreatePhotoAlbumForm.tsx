"use client";
import SelectSearch from "@/components/SelectSearch";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { PhotoAlbum } from "../photoAlbumTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { photoAlbumValidators } from "../photAlbumValidators";
import DisplayZodErrors from "@/components/DisplayZodErrors";
import { useActionState, useTransition } from "react";
import { createPhotoAlbumAction } from "../actions/createPhotoAlbumAction";
import { FileUpload } from "@/components/ui/file-upload";
export default function CreatePhotoAlbumForm({
  categories,
}: {
  categories: Array<{ value: string; label: string }>;
}) {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(createPhotoAlbumAction, undefined);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PhotoAlbum>({
    resolver: zodResolver(photoAlbumValidators),
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      isCover: false,
    },
  });

  function onsubmit(data: PhotoAlbum) {
    console.log(1234, data);
    const formData = new FormData();
    Array.from(data.images).forEach((file) => {
      formData.append("images", file);
    });
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
  console.log(345, watch("images"));

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
      <Controller
        name="images"
        control={control}
        render={({ field: { onChange } }) => <FileUpload onChange={onChange} />}
      />
      {errors.images?.message && (
        <DisplayZodErrors title="Title" errors={[errors.images?.message]} />
      )}
      <div>
        <Label>Alt Text for image</Label>
        <Input type="text" {...register("altText")} />
      </div>
      <Button disabled={isPending} type="submit">
        Submit
      </Button>
      {state?.errors.root && (
        <DisplayZodErrors title="Form" errors={state.errors.root} />
      )}
    </form>
  );
}
