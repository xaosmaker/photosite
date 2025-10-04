import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
export default function ActionsMenuOnTable() {
  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical />
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-4">
        <Button variant="destructive">Delete</Button>
        <Button variant="ghost">edit</Button>
      </PopoverContent>
    </Popover>
  );
}
