import {cn} from "@/lib/utils.ts";
import {Task} from "@/components/shared/todo/task.tsx";
import {useEffect} from "react";
import {Api} from "@/services/api-client.ts";

interface Props {
  className?: string;
}

export const TasksList = ({className}: Props) => {
  useEffect(() => {
    const loadData = async () => {
      const data = await Api.todo.getTodo();
      console.log(data);
    }
    loadData();
  }, []);

  return (
    <div className={cn("flex flex-col mt-[23px] gap-[30px]", className)}>
      <Task text="Learn React" isCompleted={false}/>
      <Task text="Prototyping To-Do List" isCompleted={true}/>
    </div>
  );
}