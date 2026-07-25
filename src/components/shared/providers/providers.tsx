import React from "react";
import {StoreProvider} from "@/components/shared/providers/store-provider.tsx";
import {Toaster} from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

// переносим все провайдеры в один компонент
export const Providers = ({children}: Props) => {
  return (
    <>
      <StoreProvider>
        {children}
        <Toaster/>
      </StoreProvider>
    </>
  );
}