import {Outlet} from "react-router-dom";
import {TopLoader} from "@/components/shared";

export const MainLayout = () => {
  return (
    <main>
      <TopLoader/>
      {/*Outlet - место где будет рендериться либо HomePage, либо TodoPage*/}
      <Outlet />
    </main>
  );
};