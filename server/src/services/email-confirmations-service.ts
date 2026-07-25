import {type Request} from "express";
import {v4 as uuidv4} from 'uuid';
import {prisma} from "@/prisma/prisma-client";
import {TokenType} from "@/generated/prisma/enums";
import type {ConfirmationEmailDto} from "./dto/confirmation-email-dto";
import {mailService} from "./mail-service";
import {BadRequestError, NotFoundError} from "@/shared/utils/errors";
import {userService} from "./user-service";
import {authService} from "./auth-service";

class EmailConfirmationService {

  /**
   * Обрабатывает новый запрос на подтверждение электронной почты.
   * @param req - Объект запроса Express.
   * @param dto - DTO с токеном подтверждения.
   * @returns Сессия пользователя после успешного подтверждения.
   * @throws NotFoundException - Если токен или пользователь не найден.
   * @throws BadRequestException - Если токен истек.
   */
  public async newVerification(req: Request, dto: ConfirmationEmailDto) {
    const existingToken = await prisma.token.findUnique({
      where: {
        token: dto.token,
        type: TokenType.VERIFICATION,
      },
    });

    if (!existingToken) {
      throw new NotFoundError('Confirmation token not found. Please ensure you have the correct token.');
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new BadRequestError('The confirmation token has expired. Please request a new confirmation token.');
    }

    const existingUser = await userService.findByEmail(existingToken.email);

    if (!existingUser) {
      throw new NotFoundError('User not found. Please check the entered email address and try again.');
    }

    await prisma.user.update({
      where: {id: existingUser.id},
      data: {isVerified: true},
    });

    await prisma.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.VERIFICATION
      },
    });

    return authService.saveSession(req, existingUser);
  }

  /**
   * Отправляет токен подтверждения на указанный email.
   * @param email - Адрес электронной почты пользователя.
   * @returns true, если токен успешно отправлен.
   */
  public async sendVerificationToken(email: string) {
    const vereficationToken = await this.generateVerificationToken(email);

    await mailService.sendConfirmationEmail(
      vereficationToken.email,
      vereficationToken.token
    );

    return true;
  }

  /**
   * Генерирует новый токен подтверждения электронной почты.
   * @param email - Адрес электронной почты пользователя.
   * @returns Объект токена подтверждения.
   */
  private async generateVerificationToken(email: string) {
    const token = uuidv4();
    const expiredIn = new Date(new Date().getTime() + 3600 * 1000); // + 1час

    const existingToken = await prisma.token.findFirst({
      where: {
        email: email,
        type: TokenType.VERIFICATION
      }
    });

    // Если старый токен существовал — удаляем его
    if (existingToken) {
      await prisma.token.deleteMany({
        where: {
          email: email,
          type: TokenType.VERIFICATION,
        },
      });
    }

    // Создаем новый токен
    const verificationToken = await prisma.token.create({
      data: {
        email: email,
        token: token,
        expiresIn: expiredIn,
        type: TokenType.VERIFICATION,
      }
    });

    return verificationToken;
  }
}

export const emailConfirmationService = new EmailConfirmationService();