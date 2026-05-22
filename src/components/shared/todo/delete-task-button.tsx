import {cn} from "@/lib/utils.ts";
import {Trash} from "lucide-react";

interface Props {
  className?: string;
}

export const DeleteTaskButton = ({className}: Props) => {
  return (
    <button className={cn("cursor-pointer", className)}>
      <Trash/>
    </button>
  );
}