import {type Request, type Response} from "express";
import type {
  TFormLoginValues,
  TFormRegisterValues
} from "@/shared/schemas/auth-schema";
import {AuthMetod} from "@/generated/prisma/enums";
import {
  BadRequestError,
  ConflictError, InternalServerError,
  NotFoundError,
  UnauthorizedError
} from "../../../shared/utils/errors";
import {emailConfirmationService} from "./email-confirmations-service";
import {verify} from "argon2";
import {userService} from "./user-service";
import {twoFactorAuthService} from "./two-factor-auth-service";
import {type User} from "../../../generated/prisma/client";
import {type ILoginResponse} from "./dto/confirmation-email-dto";
import {providerService} from "./oauth/provider-service";
import {prisma} from "../../../prisma/prisma-client";


class AuthService {

  /**
   * Регистрирует нового пользователя
   * @param dto - Объект с данными для регистрации пользователя
   * @returns Объект с сообщением об успешной регистрации
   * @throws ConflictError - Если пользователь с таким email уже существует
   */
  public async register(dto: TFormRegisterValues) {
    const isExist = await userService.findByEmail(dto.email);

    if (isExist) {
      throw new ConflictError('A user with this email already exists.');
    }

    const newUser = await userService.create(
      dto.email,
      dto.password,
      dto.name,
      "",
      AuthMetod.CREDENTIALS,
      false
    );

    await emailConfirmationService.sendVerificationToken(newUser.email)

    return newUser;
  }

  /**
   * Выполняет вход пользователя в систему.
   * @param req - Объект запроса Express.
   * @param dto - Объект с данными для входа пользователя.
   * @returns Объект с user и булевым значением о необходимости двухфакторного кода.
   * @throws NotFoundError - Если пользователь не найден.
   * @throws UnauthorizedError - Если пароль неверный или email не подтвержден.
   */
  public async login(req: Request, dto: TFormLoginValues) {
    const user = await userService.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundError('User not found. Please check the entered details.');
    }

    // Проверка, создан ли аккаунт через OAuth. Т.к у него нет пароля.
    if (!user.password) {
      throw new BadRequestError(`This account was registered via ${user.method}. Please log in using OAuth.`);
    }

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new UnauthorizedError('Incorrect password. Please try again or reset your password if you have forgotten it.')
    }

    if (!user.isVerified) {
      await emailConfirmationService.sendVerificationToken(user.email);

      throw new UnauthorizedError('Your email has not been verified. Please check your email and verify your address.')
    }

    if (user.isTwoFactorEnabled) {
      if (!dto.code) {
        await twoFactorAuthService.sendTwoFactorToken(user.email)

        return {
          user: null,
          twoFactorRequired: true
        };
      }

      await twoFactorAuthService.validateTwoFactorToken(
        user.email,
        dto.code
      )
    }

    return this.saveSession(req, user);
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerError('The session could not be conducted. There may be a server issue, or the session has already ended.')
          );
        }

        res.clearCookie(process.env.SESSION_NAME!);

        resolve();
      })
    });
  }

  public async extractProfileFromCode(req: Request, provider: string, code: string) {
    // 1. Получаем провайдер
    const baseUrl = process.env.BASE_URL!;
    const providerInstance = providerService.getProvider(provider, baseUrl);

    // 2. Получаем данные профиля
    const profile = await providerInstance.findUserByCode(code);

    // 3. Ищем привязанный аккаунт соцсети
    const account = await prisma.account.findFirst({
      where: {
        provider: profile.provider,
        providerAccountId: profile.id,
      }
    });

    let user = account?.userId
      ? await userService.findById(account.userId)
      : null;

    // Если аккаунт уже существовал и юзер найден — авторизуем
    if (user) {
      return this.saveSession(req, user);
    }

    // Если пользователя нет — ищем его по email (возможно, он регистрировался через пароль)
    user = await userService.findByEmail(profile.email);

    if (!user) {
      // Создаем нового пользователя
      user = await userService.create(
        profile.email,
        null,
        profile.name,
        profile.picture,
        profile.provider.toUpperCase() === 'GOOGLE' ? AuthMetod.GOOGLE : AuthMetod.GITHUB,
        true
      );
    }

    // Если привязки OAuth-аккаунта еще не было — создаем её
    if (!account) {
      await prisma.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: profile.provider,
          providerAccountId: profile.id,
          accessToken: profile.access_token ?? null,
          refreshToken: profile.refresh_token ?? null,
          expiresAt: profile.expires_in ?? 0
        }
      });
    }

    return this.saveSession(req, user);
  }

  public async saveSession(req: Request, user: User): Promise<ILoginResponse> {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      // .save сохраняет данные в redis
      req.session.save((err) => {
        if (err) {
          return reject(
            new InternalServerError('Failed to save the session. Check if the session settings are configured correctly.')
          );
        }

        resolve({
          user: user,
          twoFactorRequired: false
        });
      });
    });
  }
}

export const authService = new AuthService();