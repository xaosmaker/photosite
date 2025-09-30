import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { serverURL } from "@/lib/serverURL";
export default async function Page() {
  const res = await fetch(`${serverURL}/api/categories`);
  const categoryData = await res.json();

  return (
    <>
      <div className="container mx-auto rounded-xl border border-neutral-700 px-4 py-4">
        <h2 className="text-center text-2xl">Categories</h2>
        <DataTable columns={columns} data={categoryData} />
      </div>
    </>
  );
}
