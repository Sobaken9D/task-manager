import axios from "axios";
import {ApiError} from "@/shared/utils/errors.ts";

// создание абстрактного класса для других сервисов
// в данном случае он служит для обработки ошибок и хранения базового URL (напр. /cart)

// abstract не позволяет создать через new
export abstract class AbstractService {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * Обработка ошибок API-запросов.
   * Логирует детализированное сообщение в консоль и выбрасывает стандартизированную ошибку.
   * @param error - Перехваченный объект ошибки (AxiosError, системная Error или unknown).
   * @param actionName - Название метода или действия, в котором произошла ошибка.
   * @throws {Error} Стандартизированная ошибка.
   */
  protected handleError(error: unknown, actionName: string): never {
    let errorMessage = `[${actionName}] `;

    // isAxiosError помогает понять ошибка случилась при http запросе или
    // это ошибка ReferenceError, TypeError и тд.
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // либо ошибка в ответе response (тогда или 400 или 500)
        const statusCode = error.response.status;
        const serverMessage = error.response.data?.message || error.response.data?.error || 'Sever Error';

        throw new ApiError(`${errorMessage}${statusCode} ${serverMessage}`, statusCode);
      }
      if (error.request) {
        // error.request в axios означает что запрос ушел, но ответа нет (нет сети / упал сервер)
        throw new ApiError(`${errorMessage}The server is not responding. Check your connection.`, 503);
      }
      // Ошибка настройки самого запроса axios
      throw new ApiError(`${errorMessage}${error.message}`);

    }

    // Если это НЕ Axios-ошибка (например js или ts),
    throw error;
  }
}