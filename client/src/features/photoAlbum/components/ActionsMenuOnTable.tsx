import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
export default function ActionsMenuOnTable({
  deleteAction,
  editAction,
  otherAction,
}: {
  deleteAction?: React.ReactElement;
  editAction?: React.ReactElement;
  otherAction?: React.ReactElement;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical />
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-4">
        {deleteAction}
        {editAction}
        {otherAction}
      </PopoverContent>
    </Popover>
  );
}
