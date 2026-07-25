import { loaderDispatch } from "@/store/store.ts";
import NProgress from "nprogress";
import type { LoaderFunctionArgs } from "react-router";
import {verifyEmail} from "@/store/features/authSlice.ts";

/**
 * Универсальный хелпер для создания лоадеров, работающих с токенами из URL.
 * @param thunkAction - Опциональный Thunk для валидации токена на бэкенде при загрузке страницы.
 */
const createTokenLoader = (thunkAction?: (payload: { token: string }) => any) => {
  return async ({ request }: LoaderFunctionArgs) => {
    NProgress.start();

    try {
      const url = new URL(request.url);
      const token = url.searchParams.get("token") || "";

      if (!token) {
        throw new Response(
          JSON.stringify({ message: "Token is missing." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Если Thunk передан (например, для подтверждения email), выполняем его
      if (thunkAction) {
        await loaderDispatch(thunkAction({ token })).unwrap();
      }

      // Всегда возвращаем токен, чтобы компонент мог его прочитать через useLoaderData()
      return { token };
    } catch (error: any) {
      if (error instanceof Response) throw error;
      throw new Response(
        JSON.stringify({ message: error?.message || "Runtime execution error" }),
        { status: error?.status || 500, headers: { "Content-Type": "application/json" } }
      );
    } finally {
      NProgress.done();
    }
  };
};

// Экспортируем два разных лоадера, созданных одной функцией:
export const emailTokenLoader = createTokenLoader(verifyEmail); // С проверкой на бэкенде
export const resetPasswordLoader = createTokenLoader();         // Просто достает и валидирует наличие токена в URL