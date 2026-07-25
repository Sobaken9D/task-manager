import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { InfoBlock } from "@/components/shared";

// isRouteErrorResponse - является ли ошибка http-ответом
// useRouteError - позволяет перехватить выскочившую в каком-то элементе ошибку

export const ErrorPage = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let text = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    // Сюда попадают ТОЛЬКО реальные ошибки сети и бэкенда
    title = `Server Error ${error.status}`;

    if (error.data) {
      try {
        // Парсим строку JSON, которую мы вручную положили в Response
        const parsed = typeof error.data === "string" ? JSON.parse(error.data) : error.data;
        text = parsed.message || error.statusText;
      } catch {
        text = typeof error.data === "string" ? error.data : error.statusText;
      }
    } else {
      text = error.statusText || "Failed to load data.";
    }

  } else if (error instanceof Error) {
    // Сюда попадают чистые JS ошибки (TypeError и т.д.), выброшенные через new Error()
    title = "Application Error";
    text = error.message;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <InfoBlock
        title={title}
        text={text}
      />
    </div>
  );
};