import type {Request, Response, NextFunction} from 'express';
import {UnauthorizedError} from "../../../shared/utils/errors";

// MIDDLEWARE (связующее звено для проверки токена)
export function authenticateTokenMiddleware(req: Request, _: Response, next: NextFunction) {
  // req.session - задали в server.ts

  // Если в сессии (в Redis) нет ID пользователя — значит он не залогинен
  if (!req.session || !req.session.userId) {
    return next(new UnauthorizedError('Login to your account'));
  }

  // Записываем данные в req.user, чтобы роуты ниже работали
  req.user = {
    id: req.session.userId
  };

  next();
}