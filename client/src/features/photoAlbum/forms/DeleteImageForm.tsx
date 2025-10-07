"use client";
import { useActionState } from "react";
import { deleteImageAction } from "../actions/createPhotoAlbumAction";
import { Button } from "@/components/ui/button";
import DisplayZodErrors from "@/components/DisplayZodErrors";

export default function DeleteImageForm({
  albumId,
  imageId,
}: {
  albumId: string;
  imageId: string;
}) {
  const [state, action, isPending] = useActionState(
    deleteImageAction,
    undefined,
  );

  return (
    <form className="mt-4 w-full" action={() => action({ imageId, albumId })}>
      {state?.errors.root && (
        <DisplayZodErrors title="form" errors={state.errors.root} />
      )}
      <Button disabled={isPending} variant="destructive">
        Delete
      </Button>
    </form>
  );
}
