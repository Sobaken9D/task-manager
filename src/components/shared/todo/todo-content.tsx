import React from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {addTodo} from "@/store/features/todoSlice.ts";
import {cn} from "@/lib/utils/cn.ts";
import {Title} from "@/components/shared/title.tsx";
import {InputTask} from "@/components/shared/todo/input-task.tsx";
// import {AddTaskButton} from "@/components/shared/todo/add-task-button.tsx";
import {TasksFilters} from "@/components/shared/todo/tasks-filters.tsx";
import {TasksList} from "@/components/shared/todo/tasks-list.tsx";
import {Button} from "@/components/ui";


interface Props {
  className?: string;
}

export const TodoContent = ({className}: Props) => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.todo);

  const [inputText, setInputText] = React.useState("");

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText.trim()) {
      return;
    }

    await dispatch(addTodo(inputText));
    setInputText("");
    //TODO: добавить попап
  };

  return (
    <div className={cn('flex flex-col gap-[60px] justify-center items-center', className)}>
      <Title
        size="xl"
        text="My Tasks"
        className="font-bold mt-[80px]"
      />

      <form
        onSubmit={handleAddTask}
        className="flex gap-[30px] w-full justify-between"
      >
        <InputTask
          placeholder="Type your task here.."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button
          type="submit"
          size="xl"
          loading={loading}
          className="shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]"
        >
          + Add
        </Button>
      </form>

      <div className="w-full">
        <TasksFilters />
        <TasksList />
      </div>
    </div>
  );
}