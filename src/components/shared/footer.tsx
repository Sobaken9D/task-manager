import React from 'react';
import {cn} from "@/lib/utils.ts";
import {Container} from "@/components/shared/container.tsx";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Footer = ({className}: Props) => {
  return (
    <div className={cn('', className)}>
      <p className="text-[20px] text-[#6a7282] text-center">© 2025</p>
    </div>
  );
}