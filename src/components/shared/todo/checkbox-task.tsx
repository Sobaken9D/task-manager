import {cn} from "@/lib/utils.ts";
import {Check} from "lucide-react";

interface Props {
  className?: string;
  isCompleted: boolean;
}

export const CheckboxTask = ({className, isCompleted}: Props) => {
  return (
    <button className={cn("border-2 rounded-lg cursor-pointer bg-[#fff]", isCompleted && "bg-[#000]", className)}>
      <Check color="#fff"/>
    </button>
  );
}