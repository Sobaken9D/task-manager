import {Check} from "lucide-react";
import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils/cn.ts";

type Props = React.ComponentProps<typeof Button> & {
  isCompleted: boolean;
  loading: boolean;
};

export const CheckboxTaskButton = ({ className, isCompleted, loading, ...props }: Props) => {
  return (
    <Button
      variant="icon"
      size="icon"
      loading={loading}
      {...props}
      className={cn(
        "border-2 cursor-pointer bg-[#fff]",
        isCompleted && "bg-black",
        className
      )}
    >
      <Check color="#fff" />
    </Button>
  );
};