import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setTheme} from "@/store/features/uiSlice";
import {updateSettings} from "@/store/features/profileSlice";
import {Moon, Sun} from "lucide-react";
import {cn} from "@/lib/utils/cn.ts";
import {checkAuth} from "@/store/features/authSlice.ts";

interface Props {
  className?: string;
}

export const ThemeToggler = ({className}: Props) => {
    const dispatch = useAppDispatch();
    const currentTheme = useAppSelector((state) => state.ui.theme);
    const isAuthorized = useAppSelector((state) => state.auth.isCheckedSession);

    const toggleTheme = async () => {
      try {
        const nextTheme = currentTheme === "DARK" ? "LIGHT" : "DARK";
        dispatch(setTheme(nextTheme));

        await dispatch(checkAuth());

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