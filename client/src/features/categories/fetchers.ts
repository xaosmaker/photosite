import { serverURL } from "@/lib/serverURL";

export async function getCategories() {
  const res = await fetch(`${serverURL}/api/categories`);
  const categoryData = await res.json();
  return categoryData;
}
