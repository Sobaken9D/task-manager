import * as React from "react";
import {clsx} from "clsx";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
  size?: TitleSize;
  text?: string;
  className?: string;
}

export const Title = ({size = "sm", text, className}: Props) => {
  const mapTagBySize = {
    "xs": 'h5',
    "sm": 'h4',
    "md": 'h3',
    "lg": 'h2',
    "xl": 'h1',
    "2xl": 'h1',
  } as const;

  const mapClassNameBySize = {
    "xs": 'text-[16px]',
    "sm": 'text-[22px]',
    "md": 'text-[26px]',
    "lg": 'text-[32px]',
    "xl": 'text-[48px]',
    "2xl": 'text-[48px]',
  } as const;

  return React.createElement(
    mapTagBySize[size],
    {className: clsx(mapClassNameBySize[size], className)},
    text
  );
}