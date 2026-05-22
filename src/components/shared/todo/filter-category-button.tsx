import {cn} from "@/lib/utils.ts";

interface Props {
  className?: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

export const FilterCategoryButton = ({
  className,
  text,
  isActive,
  onClick
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn("cursor-pointer", isActive && "text-active-filter", className)}
    >
      {text}
    </button>
  );
}