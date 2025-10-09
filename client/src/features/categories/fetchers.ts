import { serverURL } from "@/lib/serverURL";

export async function getCategories() {
  try {
    const res = await fetch(`${serverURL}/api/categories`);
    const categoryData = await res.json();
    return categoryData;
  } catch (e) {
    console.log(e);
    return [];
  }
}
