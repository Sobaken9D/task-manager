import React from "react";
import {cn} from "@/lib/utils/cn.ts";

// InputHTMLAttributes - встроенный интерфейс поддерживающие все атрибуты input - (value, placeholder и тд)
// <HTMLInputElement> - это стандартный тип самого браузера и дженерик нужен т.к InputHTMLAttributes еще используется для HTMLTextAreaElement и HTMLSelectElement, т.к у них много одинаковых свойств.

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, ...props}, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';