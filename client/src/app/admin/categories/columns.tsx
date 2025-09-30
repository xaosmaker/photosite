"use client";

import { Category } from "@/types/CategoryTypes";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import CreateCategoryForm from "@/components/categories/forms/CreateCategoryForm";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CirclePlus } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "categoryName",
    header: "Title",
  },
  {
    id: "actionHeader",
    header: () => {
      return (
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="text-green-500">
              <CirclePlus />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>
                create a category to leave you photo albums
              </DialogDescription>
              <CreateCategoryForm />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
