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
    startTransition(() => {
      action(data);
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
      <Button disabled={isPending} type="submit">
        Submit
      </Button>
      {state?.errors.root && (
        <DisplayZodErrors title="Form" errors={state.errors.root} />
      )}
    </form>
  );
}
