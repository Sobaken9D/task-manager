import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {deleteTodo, updateTodo} from "@/store/features/todoSlice.ts";
import {cn} from "@/lib/utils/cn.ts";
import {
  CheckboxTaskButton
} from "@/components/shared/todo/checkbox-task-button.tsx";
import {TextTask} from "@/components/shared/todo/text-task.tsx";
import {Button, Input} from "@/components/ui";
import {Pencil, Trash} from "lucide-react";
import {useState} from "react";

interface Props {
  className?: string;
  text: string;
  isCompleted: boolean;
  taskId: string;
}

export const Task = ({className, text, isCompleted, taskId}: Props) => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector((state) => state.todo);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleDeleteTask = async (id: string) => {
    await dispatch(deleteTodo(id));
  };

  const handleEditTask = () => {
    setIsEditing((prev) => !prev);
  };

  const handleUpdateStatusTask = async (id: string) => {
    await dispatch(
      updateTodo({
        id,
        dto: {
          isCompleted: !isCompleted,
        },
      })
    );
  };

  const handleSaveText = async () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== text) {
      await dispatch(
        updateTodo({
          id: taskId,
          dto: {description: trimmed},
        })
      );
    } else {
      setEditText(text);
    }
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between text-[24px] leading-[24px] rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] px-[35px] py-[29px]",
        className
      )}
    >
      <div className="flex items-center flex-1 min-w-0">
        <CheckboxTaskButton
          onClick={() => handleUpdateStatusTask(taskId)}
          isCompleted={isCompleted}
          loading={loading}
        />

        {/* Общая обертка: min-w-0 позволяет внутренним элементам правильно сжиматься */}
        <div className="flex-1 ml-[30px] min-w-0 flex items-center h-[24px]">
          {isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSaveText}
              onKeyDown={(e) => e.key === "Enter" && handleSaveText()}
              autoFocus
              className="w-full h-[24px] p-0 m-0 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 text-[24px] leading-[24px] bg-transparent shadow-[0_1px_0_0_#9ca3af] rounded-none truncate"
            />
          ) : (
            /* truncate предотвращает вылезание текста */
            <div className="w-full truncate min-w-0">
              <TextTask
                text={text}
                isCompleted={isCompleted}
              />
            </div>
          )}
        </div>
      </div>

      {/* Правая часть: Кнопки */}
      <div className="flex gap-[28px] ml-[60px] shrink-0 items-center">
        <Button
          variant="icon"
          size="icon"
          loading={loading}
          onClick={handleEditTask}
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
};