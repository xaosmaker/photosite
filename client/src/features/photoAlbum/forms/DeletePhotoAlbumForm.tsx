"use client";
import { useActionState } from "react";
import { deletePhotoAlbumAction } from "../actions/createPhotoAlbumAction";
import { Button } from "@/components/ui/button";
import DisplayZodErrors from "@/components/DisplayZodErrors";

export default function DeletePhotoAlbumForm({ albumId }: { albumId: string }) {
  const [state, action, isPending] = useActionState(
    deletePhotoAlbumAction,
    undefined,
  );

  return (
    <form className="mt-4 w-full" action={() => action({ albumId })}>
      {state?.errors.root && (
        <DisplayZodErrors title="form" errors={state.errors.root} />
      )}
      <Button disabled={isPending} variant="destructive">
        Delete
      </Button>
    </form>
  );
}
