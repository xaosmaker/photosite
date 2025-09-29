import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function DisplayZodErrors({
  title,
  errors,
}: {
  title: string;
  errors: string[];
}) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle className="capitalize">{title} errors</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc text-sm">
          {errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
