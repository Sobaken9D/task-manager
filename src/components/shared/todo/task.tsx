import {cn} from "@/lib/utils.ts";
import {CheckboxTask} from "@/components/shared/todo/checkbox-task.tsx";
import {EditTaskButton} from "@/components/shared/todo/edit-task-button.tsx";
import {
  DeleteTaskButton
} from "@/components/shared/todo/delete-task-button.tsx";
import {TextTask} from "@/components/shared/todo/text-task.tsx";

interface Props {
  className?: string;
  text: string;
  isCompleted: boolean;
}

export const Task = ({className, text, isCompleted}: Props) => {
  return (
    <div className={cn("flex text-[24px] leading-[24px] rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] px-[35px] py-[29px]", className)}>
      <CheckboxTask isCompleted={isCompleted}/>
      <TextTask text={text} isCompleted={isCompleted}/>
      <div className="flex gap-[28px] ml-[60px]">
        <EditTaskButton/>
        <DeleteTaskButton/>
      </div>
    </div>
  );
}