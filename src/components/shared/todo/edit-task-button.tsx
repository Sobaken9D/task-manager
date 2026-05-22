import {cn} from "@/lib/utils.ts";
import {Pencil} from "lucide-react";

interface Props {
  className?: string;
}

export const EditTaskButton = ({className}: Props) => {
  return (
    <button className={cn("cursor-pointer", className)}>
      <Pencil/>
    </button>
  );
}