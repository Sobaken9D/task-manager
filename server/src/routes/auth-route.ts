import {Router} from "express";
import {authService} from "../services/auth-service";
import {
  emailConfirmationService
} from "../services/email-confirmations-service";
import {BadRequestError} from "@/shared/utils/errors";
import {userService} from "../services/user-service";
import {passwordRecoveryService} from "../services/password-recovery-service";
import {
  formForgotPasswordSchema,
  formLoginSchema,
  formRegisterSchema, formResetPasswordSchema
} from "@/shared/schemas/auth-schema";


export const authRouter = Router();


// эндпоинт для проверки на фронтенде авторизации на основе сессии
authRouter.get('/check-auth', async (req, res, next) => {
  try {
    // 1. Если сессии в Redis нет или нет userId — это просто гость
    if (!req.session || !req.session.userId) {
      return res.status(200).json({
        message: "Session is not active",
        data: null // Возвращаем null, статус 200 — никакой паники
      });
    }

    // 2. Если сессия есть, ищем пользователя в базе
    const user = await userService.findById(req.session.userId);

    // 3. Если сессия в Redis есть, но пользователя почему-то нет в БД (удалили)
    if (!user) {
      if (req.session) {
        await authService.logout(req, res); // Чистим битую сессию
      }
      return res.status(200).json({
        message: "Session is not active. User account no longer exists.",
        data: null
      });
    }

    // 4. Пользователь найден, сессия активна
    return res.status(200).json({
      message: "Session is active",
      data: user
    });

  } catch (error) {
    next(error);
  }
});

authRouter.post('/register', async (req, res, next) => {
  try {
    const dto = req.body;

    if (!dto) {
      return next(new BadRequestError('Request data is missing'));
    }

    const validateBody = formRegisterSchema.parse(dto);

    const registerResult = await authService.register(validateBody);

    return res.status(200).json({
      message: "You have successfully registered. Please confirm your email. A message has been sent to your email address.",
      data: registerResult
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/email-confirmation', async (req, res, next) => {
  try {
    const dto = req.body;

    if (!dto) {
      return next(new BadRequestError('Request data is missing'));
    }

    if (!dto.token || typeof dto.token !== 'string') {
      return next(new BadRequestError('Token is required and must be a string'));
    }

    const session = await emailConfirmationService.newVerification(req, dto);

    // return res.status(200).json({
    //   message: 'Email verified successfully',
    //   data: session
    // });


    return res.status(200).json({
      message: 'Email verified successfully',
      data: {
        user: session.user
      }
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const dto = req.body;

    if (!dto) {
      return next(new BadRequestError('Request data is missing'));
    }

    const validateBody = formLoginSchema.parse(dto);

    const loginResult = await authService.login(req, validateBody);

    if (loginResult.twoFactorRequired) {
      return res.status(200).json({
        message: 'Two-factor authentication code is required.',
        data: {
          user: null,
          twoFactorRequired: true
        }
      });
    }

    // Если код прошел дальше, значит сессия сохранена, отдаем юзера
    return res.status(200).json({
      message: 'Logged in successfully.',
      data: {
        user: loginResult.user,
        twoFactorRequired: false
      }
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/logout', async (req, res, next) => {
  try {
    await authService.logout(req, res);

    return res.status(200).json({
      message: 'Logout in successfully.',
      data: null
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/forgot-password', async (req, res, next) => {
  try {
    const dto = req.body;

    if (!dto) {
      return next(new BadRequestError('Request data is missing'));
    }

    const validateBody = formForgotPasswordSchema.parse(dto);

    const forgotPasswordResult = await passwordRecoveryService.forgotPassword(validateBody);

    return res.status(200).json({
      message: "An email with a password reset link has been successfully sent to your email address.",
      data: forgotPasswordResult
    });
  } catch (error) {
    next(error);
  }
});

authRouter.patch('/reset-password', async (req, res, next) => {
  try {
    const dto = req.body;

    if (!dto) {
      return next(new BadRequestError('Request data is missing'));
    }

    if (!dto.token || typeof dto.token !== 'string') {
      return next(new BadRequestError('Token is required and must be a string'));
    }

    const token = dto.token;

    const validateResetPasswordSchema = formResetPasswordSchema.parse(dto.form);

    const resetPasswordResult = await passwordRecoveryService.resetPassword(validateResetPasswordSchema, token);

    return res.status(200).json({
      message: "Password has been successfully changed.",
      data: resetPasswordResult
    });
  } catch (error) {
    next(error);
  }
});


