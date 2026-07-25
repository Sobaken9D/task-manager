import React from "react";
import {cn} from "@/lib/utils/cn.ts";
// Поможет описать стили разных вариантов
import {cva, type VariantProps} from "class-variance-authority";
// Поможет реализовать паттерн asChild - когда кнопка передаст логику и стили потомку
import {Slot} from "@radix-ui/react-slot";
import {Loader} from "lucide-react";

// InputHTMLAttributes - встроенный интерфейс поддерживающие все атрибуты input - (value, placeholder и тд)
// <HTMLInputElement> - это стандартный тип самого браузера и дженерик нужен т.к InputHTMLAttributes еще используется для HTMLTextAreaElement и HTMLSelectElement, т.к у них много одинаковых свойств.

const buttonVariants = cva(
  "inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md active:translate-y-[1px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-500 cursor-pointer transition-all duration-200 ease-in-out font-bold",
  {
    variants: {
      variant: {
        default: "bg-btn-primary text-btn-primary-text hover:opacity-80",
        destructive: "bg-btn-destructive text-btn-destructive-text hover:opacity-80",
        outline: "border bg-transparent text-text-black hover:bg-black/5 active:bg-black/10",
        ghost: "hover:bg-link-bg text-text-black",
        icon: "",
      },
      size: {
        default: "h-10 px-4 py-2 text-[16px]",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "w-[139px] rounded-xl h-[60px] text-[24px]",
        icon: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

// React.forwardRef - функция обертка, которая принимает два аргумента - объект с пропсами (props) и ссылку (ref)
// forwardRef - перенаправляет ссылку на базовый html элемент <button>, в кастомных компонентах ref = undefined
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    loading,
    disabled,
    children,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({variant, size, className}))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {!loading ? children : <Loader className="w-5 h-5 animate-spin" />}
      </Comp>
    );
  }
);

// Когда вы оборачиваете компонент в функцию React.forwardRef, React технически создает новый безымянный объект.
Button.displayName = "Button";