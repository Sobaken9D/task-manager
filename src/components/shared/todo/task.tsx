import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {deleteTodo} from "@/store/features/todoSlice.ts";
import {cn} from "@/lib/utils/cn.ts";
import {
  CheckboxTaskButton
} from "@/components/shared/todo/checkbox-task-button.tsx";
import {TextTask} from "@/components/shared/todo/text-task.tsx";
import {Button} from "@/components/ui";
import {Pencil, Trash} from "lucide-react";


interface Props {
  className?: string;
  text: string;
  isCompleted: boolean;
  taskId: string;
}

export const Task = ({className, text, isCompleted, taskId}: Props) => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.todo);

  const handleDeleteTask = async (taskId: string) => {
    await dispatch(deleteTodo(taskId));
  }

  const handleEditTask = () => {
    console.log("edit");
  };

  const handleUpdateStatusTask = () => {
    console.log("updatetStatusTask");
  }

  return (
    <div className={cn("flex text-[24px] leading-[24px] rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] px-[35px] py-[29px]", className)}>
      <CheckboxTaskButton
        onClick={() => handleUpdateStatusTask()}
        isCompleted={isCompleted}
        loading={loading}
      />
      <TextTask
        text={text}
        isCompleted={isCompleted}
      />
      <div className="flex gap-[28px] ml-[60px]">
        <Button
          variant="icon"
          size="icon"
          loading={loading}
          onClick={() => handleEditTask()}
        >
          <Pencil />
        </Button>
        <Button
          variant="icon"
          size="icon"
          loading={loading}
          onClick={() => handleDeleteTask(taskId)}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}