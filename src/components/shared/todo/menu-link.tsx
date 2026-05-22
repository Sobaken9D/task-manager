import React from "react";
import {cn} from "@/lib/utils.ts";
import {NavLink} from "react-router-dom";

interface Props {
  to?: string;
  className?: string;
  children?: React.ReactNode;
}

export const MenuLink = ({to, className, children}: Props) => {
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        cn(
          "flex w-[104px] h-[58px] justify-center items-center rounded-[12px] transition cursor-pointer",
          isActive && "bg-link-bg",
          className
        )
      }
    >
      {children}
    </NavLink>
  );
}

