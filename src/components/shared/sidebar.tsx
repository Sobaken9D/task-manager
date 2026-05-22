import {cn} from "@/lib/utils.ts";
import {CalendarDays, ListTodo, Menu, Settings} from "lucide-react";
import {MenuLink} from "@/components/shared/todo/menu-link.tsx";
import {useState} from "react";

import avatarImage from "@/assets/avatar.png";

// import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
// import {setActiveId} from "@/store/features/categorySlice.ts";
// const dispatch = useAppDispatch();
// const categoryActiveId = useAppSelector((state) => state.category.activeId);
//
// const handleCategoryClick = (id: number) => {
//   dispatch(setActiveId(id));
// }


interface Props {
  className?: string;
}

export const Sidebar = ({className}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const name = "Jane Doe";
  const email = "janedoe@gmail.com";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={cn('flex flex-col justify-start items-center shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] bg-sidebar-bg',
        "transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-[360px]" : "w-[130px]",
        className
      )}
    >
      <div
        className={cn("transition-all duration-300 ease-in-out", // Плавное смещение контейнера кнопки меню
          isOpen && "w-full justify-start ml-[48px]"
        )}
      >
        <button
          onClick={() => toggleSidebar()}
          className={cn("flex w-[48px] h-[48px] shrink-0 justify-center items-center rounded-[12px] transition cursor-pointer mt-[40px]",
          )}
        >
          <Menu
            size={isOpen ? 32 : 48}
            strokeWidth={isOpen ? 3.2 : 2.2}
            className="transition-all duration-300 ease-in-out"
          />
        </button>
      </div>

      <div
        className={cn(
          "flex flex-col justify-center items-center transition-all duration-300 ease-in-out overflow-hidden",
          isOpen
            ? "mt-[28px] opacity-100 max-h-[300px]"
            : "mt-0 opacity-0 max-h-0 pointer-events-none"
        )}
      >
        <div className="flex justify-center items-center rounded-[50%]">
          <img
            src={avatarImage}
            alt="avatar"
          />
        </div>
        <p className="text-[24px] font-bold mt-[28px] whitespace-nowrap">
          {name}
        </p>
        <p className="text-[20px] text-text-gray whitespace-nowrap">
          {email}
        </p>
      </div>

      <hr
        className={cn("h-[2px] w-[104px] mt-[35px] border-t border-gray-300 transition-all duration-300 ease-in-out",
          isOpen ? "w-[290px]" : "w-[104px]"
        )}
      />

      <MenuLink
        to="/todo"
        className={cn("mt-[35px] transition-all duration-300 ease-in-out",
          isOpen && "flex justify-start gap-[44px] w-[290px] pl-[21px]"
        )}
      >
        <ListTodo
          size={isOpen ? 32 : 48}
          strokeWidth={isOpen ? 3.2 : 2.2}
          className="transition-all duration-300 ease-in-out shrink-0"
        />
        <span
          className={cn(
            "text-[24px] font-bold whitespace-nowrap transition-opacity duration-300",
            isOpen ? "opacity-100 delay-100" : "opacity-0 pointer-events-none w-0"
          )}
        >
          My tasks
        </span>
      </MenuLink>

      <MenuLink
        to="/calendar"
        className={cn("mt-[24px] transition-all duration-300 ease-in-out",
          isOpen && "flex justify-start gap-[44px] w-[290px] pl-[21px]"
        )}
      >
        <CalendarDays
          size={isOpen ? 32 : 48}
          strokeWidth={isOpen ? 3.2 : 2.2}
          className="transition-all duration-300 ease-in-out shrink-0"
        />
        <span
          className={cn(
            "text-[24px] font-bold whitespace-nowrap transition-opacity duration-300",
            isOpen ? "opacity-100 delay-100" : "opacity-0 pointer-events-none w-0"
          )}
        >
          Calendar
        </span>
      </MenuLink>

      <MenuLink
        to="/settings"
        className={cn("mt-[24px] transition-all duration-300 ease-in-out",
          isOpen && "flex justify-start gap-[44px] w-[290px] pl-[21px]"
        )}
      >
        <Settings
          size={isOpen ? 32 : 48}
          strokeWidth={isOpen ? 3.2 : 2.2}
          className="transition-all duration-300 ease-in-out shrink-0"
        />
        <span
          className={cn(
            "text-[24px] font-bold whitespace-nowrap transition-opacity duration-300",
            isOpen ? "opacity-100 delay-100" : "opacity-0 pointer-events-none w-0"
          )}
        >
          Settings
        </span>
      </MenuLink>
    </div>
  );
}