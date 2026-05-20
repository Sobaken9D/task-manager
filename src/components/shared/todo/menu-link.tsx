// 130px -> 360px
// box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);

import React from "react";
import {cn} from "@/lib/utils.ts";

interface Props {
  className?: string;
  children?: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

export const MenuLink = ({className, children, isActive, onClick}: Props) => {
  return (
    <div
      className={cn(
        "flex w-[104px] justify-center items-center rounded-[12px] transition cursor-pointer", // Добавь курсор, чтобы было понятно, что это кнопка
        isActive && "bg-link-bg",
        className
      )}
      onClick={onClick} // Исправлено: теперь это переменная из пропсов
    >
      {children}
    </div>
  );
}