import {prisma} from "../../../prisma/prisma-client";
import {TokenType} from "../../../generated/prisma/enums";
import {mailService} from "./mail-service";
import {BadRequestError, NotFoundError} from "../../../shared/utils/errors";


class TwoFactorAuthService {

  /**
   * Генерирует новый токен двухфакторной аутентификации.
   * @param email - Адрес электронной почты пользователя.
   * @returns Объект токена двухфакторной аутентификации.
   */
  private async generateTwoFactorToken(email: string) {
    // 6-значный токен
    const token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    // действует 5 минут
    const expiresIn = new Date(new Date().getTime() + 300000);

    const existingToken = await prisma.token.findFirst({
      where: {
        email: email,
        type: TokenType.TWO_FACTOR
      }
    });

    if (existingToken) {
      await prisma.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.TWO_FACTOR
        }
      });
    }

    const twoFactorToken = await prisma.token.create({
      data: {
        email: email,
        token: token,
        expiresIn: expiresIn,
        type: TokenType.TWO_FACTOR,
      }
    });

    return twoFactorToken;
  }

  /**
   * Отправляет токен двухфакторной аутентификации на указанный email.
   * @param email - Адрес электронной почты пользователя, которому нужно отправить токен.
   * @returns true, если токен успешно отправлен.
   */
  public async sendTwoFactorToken(email: string) {
    const twoFactorToken = await this.generateTwoFactorToken(email)

    await mailService.sendTwoFactorTokenEmail(
      twoFactorToken.email,
      twoFactorToken.token
    )

    return true
  }

  /**
   * Проверяет токен двухфакторной аутентификации.
   * @param email - Адрес электронной почты пользователя.
   * @param code - Код двухфакторной аутентификации, введенный пользователем.
   * @returns true, если токен действителен; в противном случае выбрасывает исключения.
   * @throws NotFoundError - Если токен не найден.
   * @throws BadRequestError - Если код неверен или срок действия токена истек.
   */
  public async validateTwoFactorToken(email: string, code: string) {
    const existingToken = await prisma.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR
      }
    })

    if (!existingToken) {
      throw new NotFoundError('Two-factor authentication token not found. Make sure you requested a token for this email address.');
    }

    if (existingToken.token !== code) {
      throw new BadRequestError('Invalid two-factor authentication code. Please check the entered code and try again.');
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date()

    if (hasExpired) {
      throw new BadRequestError('The two-factor authentication token has expired. Please request a new token.');
    }

    await prisma.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.TWO_FACTOR
      }
    })

    return true;
  }
}

export const twoFactorAuthService = new TwoFactorAuthService();