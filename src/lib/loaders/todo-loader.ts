import {loaderDispatch, store} from "@/store/store.ts";
import NProgress from "nprogress";
import {fetchTodo} from "@/store/features/todoSlice.ts";

/**
 * Хелпер для создания лоадеров React Router.
 * Автоматически управляет NProgress и правильно обрабатывает ошибки Redux Thunk.
 *
 * @param thunkAction - Функция Thunk-экшена, которую нужно задиспатчить
 */
export const createTodoLoader = (thunkAction: () => any) => {
  return async () => {
    NProgress.start();

    try {
      await loaderDispatch(thunkAction()).unwrap();
      return null;
    } catch (error: any) {
      // 1. Если это сетевая ошибка API со статусом
      if (error?.status) {
        throw new Response(
          JSON.stringify({ message: error.message }),
          {
            status: error.status,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      // 2. Если это ошибка JS (нет статуса) — пробрасываем как чистый Error
      throw new Error(error?.message || "Runtime execution error");
    } finally {
      NProgress.done();
    }
  };
};

export const todoLoader = createTodoLoader(fetchTodo);