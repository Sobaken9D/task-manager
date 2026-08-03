import {cn} from "@/lib/utils/cn.ts";


interface Props {
  className?: string;
  text: string;
  isCompleted: boolean;
}

export const TextTask = ({className, text, isCompleted}: Props) => {
  return (
    <div className={cn("flex-1", isCompleted && "text-inactive-filter line-through", className)}>
      {text}
    </div>
  );
}