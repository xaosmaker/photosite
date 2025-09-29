import CreateCategoryForm from "@/components/categories/forms/CreateCategoryForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Page() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Create Category </CardTitle>
        <CardDescription>
          create a category to leave you photo albums
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateCategoryForm />
      </CardContent>
    </Card>
  );
}
