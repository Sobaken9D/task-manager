import {Router} from "express";
import {providerService} from "../services/oauth/provider-service";
import {authService} from "../services/auth-service";

export const oauthRouter = Router();

/**
 * Перенаправление на страницу входа (Google/GitHub)
 * GET /auth/oauth/connect/google
 * GET /auth/oauth/connect/github
 */
oauthRouter.get('/connect/:provider', (req, res, next) => {
  try {
    const {provider} = req.params;

    const baseUrl = process.env.BASE_URL!;

    const oauthProvider = providerService.getProvider(provider, baseUrl);
    const redirectUrl = oauthProvider.getAuthUrl();

    // Редиректим юзера на форму входа Google/GitHub
    return res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
});

/**
 * Обработка ответа от Google/GitHub после входа
 * GET /api/auth/oauth/callback/google
 */
oauthRouter.get('/callback/:provider', async (req, res, next) => {
  try {
    const { provider } = req.params;
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ message: 'Код авторизации не найден' });
    }

    // 1. Извлекаем профиль, создаем/находим юзера и сохраняем сессию
    await authService.extractProfileFromCode(req, provider, code);

    // 2. Перенаправляем пользователя на фронтенд (например, в личный кабинет)
    const clientUrl = process.env.REDIRECT_URL_AFTER_OAUTH;
    return res.redirect(`${clientUrl}`);
  } catch (error) {
    next(error);
  }
});