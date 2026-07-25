import {useAppSelector} from "@/store/hooks.ts";
import {cn} from "@/lib/utils/cn.ts";
import {Task} from "@/components/shared/todo/task.tsx";

interface Props {
  className?: string;
}

export const TasksList = ({className}: Props) => {
  // уже сделали fetch при переходе
  const {items, loading} = useAppSelector(state => state.todo);

  if (loading) {
    return (
      <div className="text-center text-[30px]">Loading tasks...</div>
    );
  }

  return (
    <div className={cn("flex flex-col mt-[23px] gap-[30px]", className)}>
      {
        items.map((task) => (
          <Task
            key={task.id}
            text={task.description}
            isCompleted={task.isCompleted}
            taskId={task.id}
          />
        ))
      }
    </div>
  );
}