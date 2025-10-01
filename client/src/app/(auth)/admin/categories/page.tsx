import { DataTable } from "@/components/data-table";
import { categoryTableCols } from "@/features/categories/CategoryTablecols";
import { getCategories } from "@/features/categories/fetchers";
export default async function Page() {
  const categoryData = await getCategories();

  return (
    <>
      <div className="container mx-auto rounded-xl border border-neutral-700 px-4 py-4">
        <h2 className="text-center text-2xl">Categories</h2>
        <DataTable columns={categoryTableCols} data={categoryData} />
      </div>
    </>
  );
}
