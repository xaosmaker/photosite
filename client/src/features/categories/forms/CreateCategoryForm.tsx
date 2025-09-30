"use client";
import DisplayZodErrors from "@/components/DisplayZodErrors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { createCategoryAction } from "../actions/createCategoryAction";

export default function CreateCategoryForm() {
  const [state, action, isPending] = useActionState(
    createCategoryAction,
    undefined,
  );
  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          defaultValue={state?.inputs?.categoryName as string}
          name="categoryName"
          type="text"
          required
        />

        {state?.errors?.categoryName && (
          <DisplayZodErrors title="Title" errors={state.errors?.categoryName} />
        )}
      </div>

      <Button disabled={isPending} type="submit">
        Create Category
      </Button>
      {state?.errors.root && (
        <DisplayZodErrors title="Form" errors={state.errors?.root} />
      )}
    </form>
  );
}
