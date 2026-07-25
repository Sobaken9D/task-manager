import {Router} from "express";
import {BadRequestError} from "../../../shared/utils/errors";
import {authenticateTokenMiddleware} from "../middlewares/auth-middleware";
import {
  formDeleteAccountSchema, formUpdateSettingsSchema,
} from "../../../shared/schemas/auth-schema";
import {authService} from "../services/auth-service";
import {userService} from "../services/user-service";

export const profileRouter = Router();

// Защищаем все роуты задач этим middleware
profileRouter.use(authenticateTokenMiddleware);

// эндпоинт для обновления настроек пользователя
profileRouter.patch('/update-settings', async (req, res, next) => {
  try {
    const userId = req.session.userId!;
    const dto = req.body;

    if (!dto) {
      return next(new BadRequestError('Request data is missing'));
    }

    const validateBody = formUpdateSettingsSchema.parse(dto);

    await userService.updateSettings(validateBody, userId);

    return res.status(200).json({
      message: "Settings is successfully updated.",
      data: null // тут должны быть настройки
    });

  } catch (error) {
    next(error);
  }
});

// эндпоинт для удаление аккаунта пользователя
profileRouter.post('/delete-user', async (req, res, next) => {
  try {
    const userId = req.session.userId!;
    const dto = req.body;

    if (!dto) {
      return next(new BadRequestError('Request data is missing'));
    }

    const validateBody = formDeleteAccountSchema.parse(dto);
    const password = validateBody.password;

    await userService.delete(userId, password);

    // удаляем сессию и куки
    await authService.logout(req, res);

    return res.status(200).json({
      message: "User is successfully deleted.",
      data: null
    });

  } catch (error) {
    next(error);
  }
});