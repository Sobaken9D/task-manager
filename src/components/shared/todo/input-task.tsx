import React from 'react';
import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";

// ComponentProps - возвращает пропсы компонента
// typeof Input - возвращает слепок функции, что-то типа (props: { className?: string; type?: string; placeholder?: string; }) => React.JSX.Element

type Props = React.ComponentProps<typeof Input>

export const InputTask = ({className, ...props}: Props) => {
  return (
    <Input {...props} className={cn('w-[519px] h-[59px] rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] py-[16px] pl-[26px] pr-[54px] text-[24px] font-normal outline-none', className)}
    />
  );
}