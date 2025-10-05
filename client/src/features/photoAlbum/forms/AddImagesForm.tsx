import DisplayZodErrors from "@/components/DisplayZodErrors";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormRegisterReturn,
} from "react-hook-form";

export default function AddImagesForm<T extends FieldValues>({
  register,
  control,
  name,
  errors,
  errorTitle,
}: {
  register: UseFormRegisterReturn;
  control: Control<T>;
  name: Path<T>;
  errors: string | undefined;
  errorTitle: string;
}) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => <FileUpload onChange={onChange} />}
      />
      {errors && <DisplayZodErrors title={errorTitle} errors={[errors]} />}
      <div>
        <Label>Alt Text for image</Label>
        <Input type="text" {...register} />
      </div>
    </>
  );
}
