import React from "react";
import {cn} from "@/lib/utils.ts";


// InputHTMLAttributes - встроенный интерфейс поддерживающие все атрибуты input - (value, placeholder и тд)
// <HTMLInputElement> - это стандартный тип самого браузера и дженерик нужен т.к InputHTMLAttributes еще используется для HTMLTextAreaElement и HTMLSelectElement, т.к у них много одинаковых свойств.

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({className, ...props}: Props) => {
  return (
    <input
      className={cn('', className)}
      {...props}
    />
  );
};