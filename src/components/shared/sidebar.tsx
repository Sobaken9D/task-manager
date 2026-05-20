// 130px -> 360px
// box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);

import {CalendarDays, ListTodo, Menu, Settings} from "lucide-react";
import React from "react";
import {cn} from "@/lib/utils.ts";
import {MenuLink} from "@/components/shared/todo/menu-link.tsx";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {setActiveId} from "@/store/features/categorySlice.ts";

interface Props {
  className?: string;
}

export const Sidebar = ({className}: Props) => {
  const dispatch = useAppDispatch();
  const categoryActiveId = useAppSelector((state) => state.category.activeId);

  const handleCategoryClick = (id: number) => {
    dispatch(setActiveId(id));
  }

  return (
    <div className={cn('flex flex-col justify-start items-center w-[130px] shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] bg-sidebar-bg', className)}>
      <MenuLink
        className="mt-[40px]"
        isActive={false}
      >
        <Menu
          size={48}
          strokeWidth={2.2}
        />
      </MenuLink>
      <hr className="h-[2px] w-[104px] mt-[35px] border-t border-gray-300" />
      <MenuLink
        className="mt-[35px]"
        isActive={categoryActiveId === 0}
        onClick={() => handleCategoryClick(0)}
      >
        <ListTodo
          size={48}
          strokeWidth={2.2}
        />
      </MenuLink>
      <MenuLink
        className="mt-[24px]"
        isActive={categoryActiveId === 1}
        onClick={() => handleCategoryClick(1)}
      >
        <CalendarDays
          size={48}
          strokeWidth={2.2}
        />
      </MenuLink>
      <MenuLink
        className="mt-[24px]"
        isActive={categoryActiveId === 2}
        onClick={() => handleCategoryClick(2)}
      >
        <Settings
          size={48}
          strokeWidth={2.2}
        />
      </MenuLink>
    </div>
  );
}