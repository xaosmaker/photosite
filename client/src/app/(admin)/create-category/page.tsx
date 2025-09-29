"use client";
import DisplayZodErrors from "@/components/DisplayZodErrors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategoryAction } from "@/server-actions/createCategoryAction";
import { useActionState } from "react";
export default function Page() {
  const [state, action, isPending] = useActionState(
    createCategoryAction,
    undefined,
  );

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Create Category </CardTitle>
        <CardDescription>
          create a category to leave you photo albums
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              defaultValue={state?.inputs?.title as string}
              name="title"
              type="text"
              required
            />

            {state?.errors?.title && (
              <DisplayZodErrors title="Title" errors={state.errors?.title} />
            )}
          </div>

          <Button disabled={isPending} type="submit">
            Create Category
          </Button>
          {state?.errors.root && (
            <DisplayZodErrors title="Form" errors={state.errors?.root} />
          )}
        </form>
      </CardContent>
    </Card>
  );
}
