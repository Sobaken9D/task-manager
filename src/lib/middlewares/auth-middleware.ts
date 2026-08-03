import {redirect} from "react-router-dom";
import { store, loaderDispatch } from "@/store/store.ts";
import { checkAuth } from "@/store/features/authSlice.ts";
import {PATHS} from "@/constants/paths.ts";

const getAuthenticatedUser = async () => {
  // let { user, isCheckedSession } = store.getState().auth;
  let { isCheckedSession, isAuthenticated } = store.getState().auth;


  if (!isCheckedSession) {
    try {
      // const result = await loaderDispatch(checkAuth()).unwrap();
      // user = result.data;

      await loaderDispatch(checkAuth()).unwrap();

      // Забираем актуальное состояние из стора после запроса
      isAuthenticated = store.getState().auth.isAuthenticated;
    } catch {
      isAuthenticated = false;
    }
  }
  return isAuthenticated;
};

// Фабрика middleware для защиты приватных роутов
export const requireAuth = (redirectTo: string = PATHS.LOGIN) => {
  // сама функция middleware
  // Request - встроенный тип в браузер
  return async (ctx: { request: Request }, next: () => Promise<any>) => {
    const isAuthenticated = await getAuthenticatedUser();

    if (!isAuthenticated) {
      // 1. Получаем полный URL, на который шел пользователь (например, http://localhost:5173/todo)
      const url = new URL(ctx.request.url);

      // 2. Достаем только путь и гет-параметры (например, /todo?search=1)
      const pathname = url.pathname + url.search;

      // 3. Формируем ссылку для редиректа с параметром возврата
      // Результат: /auth/login?redirect=%2Ftodo
      return redirect(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
    }

    return next();
  };
};

// Фабрика middleware для гостей
export const requireGuest = (redirectTo: string = PATHS.SETTINGS) => {
  return async (_: any, next: () => Promise<any>) => {
    const isAuthenticated = await getAuthenticatedUser();

    if (isAuthenticated) {
      return redirect(redirectTo);
    }

    return next();
  };
};