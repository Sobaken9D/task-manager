import React from 'react';
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";


// ComponentProps - возвращает пропсы компонента
// typeof Input - возвращает слепок функции, что-то типа (props: { className?: string; type?: string; placeholder?: string; }) => React.JSX.Element

type Props = React.ComponentProps<typeof Button>

export const AddTaskButton = ({className, ...props}: Props) => {
  return (
    <Button {...props} className={cn('w-[140px] h-[59px] text-[24px] text-white font-bold color-white rounded-[12px] bg-black shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]', className)}
    />
  );
}