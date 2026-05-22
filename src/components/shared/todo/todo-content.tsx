import {cn} from "@/lib/utils.ts";
import {Title} from "@/components/shared/title.tsx";
import {InputTask} from "@/components/shared/todo/input-task.tsx";
import {AddTaskButton} from "@/components/shared/todo/add-task-button.tsx";

import {TasksList} from "@/components/shared/todo/tasks-list.tsx";
import {TasksFilters} from "@/components/shared/todo/tasks-filters.tsx";

interface Props {
  className?: string;
}

export const TodoContent = ({className}: Props) => {
  return (
    <div className={cn('flex flex-col gap-[60px] justify-center items-center', className)}>
      <Title
        size="xl"
        text="My Tasks"
        className={"font-bold mt-[80px]"}
      />

      <div className="flex gap-[30px] w-full justify-between">
        <InputTask placeholder="Type your task here.." />
        <AddTaskButton text='+ Add' />
      </div>

      {/*<TasksPlaceholder/>*/}
      <div className="w-full">
        <TasksFilters />
        <TasksList />
      </div>
    </div>
  );
}