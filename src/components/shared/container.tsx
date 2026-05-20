import React from 'react';
import {cn} from "@/lib/utils.ts";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Container = ({className, children}: Props) => {
  return (
    <div className={cn('mx-auto max-w-[700px]', className)}>{children}</div>
  );
}