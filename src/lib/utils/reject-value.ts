import {ApiError} from "@/shared/utils/errors.ts";

/**
 * Форматирует ошибку для возврата через rejectWithValue в AsyncThunk.
 * Вычленяет HTTP статус для сетевых ошибок и оставляет чистый текст для JS ошибок.
 */
export const getRejectValue = (error: unknown, thunkName: string) => {
  // 1. Если это наша кастомная ошибка из AbstractService
  if (error instanceof ApiError) {
    return {
      message: error.message,
      status: error.statusCode, // Передаем чистую цифру-статус
    };
  }

  // 2. На случай непредвиденных JS-ошибок (TypeError и т.д.)
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  // 3. Если пришло что-то абсолютно непонятное
  return {
    message: `An unexpected error occurred in Redux aggregator while ${thunkName}.`
  };
};