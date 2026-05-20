import {cn} from "@/lib/utils.ts";
import {Title} from "@/components/shared/title.tsx";
import {InputTask} from "@/components/shared/todo/input-task.tsx";
import {AddTaskButton} from "@/components/shared/todo/add-task-button.tsx";

import selfieImage from "@/assets/selfie.png";

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

      <div className="flex gap-[30px] justify-between">
        <InputTask placeholder="Type your task here.." />
        <AddTaskButton text='+ Add' />
      </div>

      <div className="flex relative w-full h-[500px]">
        <img
          className="absolute top-0 left-[-190px]"
          src={selfieImage as string}
          alt="selfie"
        />
        <p className="absolute top-[50%] translate-y-[-50%] right-0 text-[24px] italic">
          Empty as my motivation on Monday <span className="not-italic">😅</span>. <br />
          Let’s start adding stuff!
        </p>
      </div>
    </div>
  );
}