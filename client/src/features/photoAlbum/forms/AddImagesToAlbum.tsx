"use client";
import { useForm } from "react-hook-form";
import AddImagesForm from "./AddImagesForm";
import { ImageValidator } from "../photoAlbumTypes";
import { Button } from "@/components/ui/button";
import { uploadPhotoAlbumImagesAction } from "../actions/createPhotoAlbumAction";
import { useActionState, useTransition } from "react";
import DisplayZodErrors from "@/components/DisplayZodErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageValidator } from "../photAlbumValidators";

export default function AddImagesToAlbum({ albumId }: { albumId: number }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ImageValidator>({
    mode: "onChange",
    resolver: zodResolver(imageValidator),
    criteriaMode: "all",

    defaultValues: {
      albumId: albumId,
    },
  });

  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(
    uploadPhotoAlbumImagesAction,
    undefined,
  );
  function onsubmit(data: ImageValidator) {
    const formData = new FormData();
    Array.from(data.images).forEach((file) => {
      formData.append("images", file);
    });
    const keys = Object.keys(data) as (keyof ImageValidator)[];
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
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4">
      <AddImagesForm
        register={register("alt")}
        control={control}
        name="images"
        errorTitle="Images"
        errors={errors.images?.message}
      />
      {state?.errors.root && (
        <DisplayZodErrors title="Form Error" errors={state.errors.root} />
      )}

      <Button disabled={isPending} type="submit">
        Submit
      </Button>
    </form>
  );
}
