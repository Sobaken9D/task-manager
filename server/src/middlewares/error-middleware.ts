import type {Request, Response, NextFunction} from 'express';
import {ZodError} from "zod";

export function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  // 1. Ошибка валидации Zod (400)
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      // err.flatten().fieldErrors вернет объект формата { имяПоля: ['массив сообщений'] }
      validateErrors: err.flatten().fieldErrors
    });
  }

  // 2. Наши кастомные ошибки (404 NotFoundError, 403 ForbiddenError и т.д.)
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }

  // 3. Все остальные непредвиденные ошибки разработчика или базы данных (500)
  return res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
}