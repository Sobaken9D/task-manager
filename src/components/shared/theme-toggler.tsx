import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setTheme} from "@/store/features/uiSlice";
import {updateSettings} from "@/store/features/profileSlice";
import {Moon, Sun} from "lucide-react";
import {cn} from "@/lib/utils/cn.ts";

interface Props {
  className?: string;
}

export const ThemeToggler = ({className}: Props) => {
    const dispatch = useAppDispatch();
    const currentTheme = useAppSelector((state) => state.ui.theme);
    const isAuthorized = useAppSelector((state) => !!state.auth.user);

    const toggleTheme = async () => {
      try {
        const nextTheme = currentTheme === "DARK" ? "LIGHT" : "DARK";

        dispatch(setTheme(nextTheme));

        if(isAuthorized) {
          await dispatch(updateSettings({
            theme: nextTheme,
          })).unwrap();
        }

      } catch (error) {
        dispatch(setTheme(currentTheme));
      }
    };

    return (
      <button
        className={cn('cursor-pointer', className)}
        onClick={toggleTheme}
      >
        {
          currentTheme === "LIGHT" ? <Moon
            strokeWidth={"2px"}
            size={"48px"}
          /> : <Sun
            strokeWidth={"2px"}
            size={"48px"}
          />
        }
      </button>
    );
  }
;