"use client";
import { Input } from "@/components/ui/input";
import { ImageType } from "@/types/imageType";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { ImageForm } from "../photoAlbumTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageFieldsValidator } from "../photAlbumValidators";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useActionState, useTransition } from "react";
import { updateImageDetaild } from "../actions/createPhotoAlbumAction";
import DisplayZodErrors from "@/components/DisplayZodErrors";

export default function UpdateImageForm({
  imageData,
}: {
  imageData: ImageType;
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ImageForm>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(imageFieldsValidator),
    defaultValues: {
      isCover: imageData.isCover,
      isShown: imageData.isShown,
      alt: imageData.alt,
      pkid: imageData.pkid,
      albumId: imageData.albumId,
    },
  });
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(updateImageDetaild, undefined);

  function onsubmit(data: ImageForm) {
    startTransition(() => {
      action(data);
    });
  }
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="altText" className="capitalize">
          alt text
        </Label>
        <Input id="altText" type="text" {...register("alt")} required />
        {errors.alt?.message && (
          <DisplayZodErrors title="Alt" errors={[errors.alt.message]} />
        )}
      </div>
      <div className="flex items-center gap-4">
        <Controller
          control={control}
          name="isCover"
          render={({ field: { value, onChange } }) => {
            return (
              <Checkbox
                id="isCover"
                checked={value}
                onCheckedChange={onChange}
              />
            );
          }}
        />
        <Label htmlFor="isCover">Is Cover</Label>

        {errors.isCover?.message && (
          <DisplayZodErrors title="Alt" errors={[errors.isCover.message]} />
        )}
      </div>

      <div className="flex items-center gap-4">
        <Controller
          control={control}
          name="isShown"
          render={({ field: { value, onChange } }) => {
            return (
              <Checkbox
                id="isShown"
                checked={value}
                onCheckedChange={onChange}
              />
            );
          }}
        />
        <Label htmlFor="isShown">Is Shown</Label>

        {errors.isShown?.message && (
          <DisplayZodErrors title="Alt" errors={[errors.isShown.message]} />
        )}
      </div>
      {state?.errors.root && (
        <DisplayZodErrors title="form" errors={state.errors.root} />
      )}
      <Button disabled={isPending} type="submit">
        Update
      </Button>
    </form>
  );
}
