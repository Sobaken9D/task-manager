import {v4 as uuidv4} from 'uuid';
import {prisma} from "@/prisma/prisma-client";
import {TokenType} from "@/generated/prisma/enums";
import {
  type ForgotPasswordDto,
  type ResetPasswordDto
} from "./dto/reset-password-dto";
import {userService} from "./user-service";
import {BadRequestError, NotFoundError} from "@/shared/utils/errors";
import {mailService} from "./mail-service";
import {hash, verify} from "argon2";

class PasswordRecoveryService {

  /**
   * Запрашивает сброс пароля и отправляет токен на указанный email.
   * @param dto - DTO с адресом электронной почты пользователя.
   * @returns true, если токен успешно отправлен.
   * @throws NotFoundError - Если пользователь не найден.
   */
  public async forgotPassword(dto: ForgotPasswordDto) {
    const existingUser = await userService.findByEmail(dto.email);

    if (!existingUser) {
      throw new NotFoundError('User not found. Please check the entered email address and submit the form again.');
    }

    const passwordResetToken = await this.generatePasswordResetToken(existingUser.email);

    await mailService.sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return true;
  }

  /**
   * Устанавливает новый пароль для пользователя.
   * @param dto - DTO с новым паролем.
   * @param token - Токен для сброса пароля.
   * @returns true, если пароль успешно изменен.
   * @throws NotFoundException - Если токен или пользователь не найден.
   * @throws BadRequestException - Если токен истек.
   */
  public async resetPassword(dto: ResetPasswordDto, token: string) {
    const existingToken = await prisma.token.findUnique({
      where: {
        token: token,
        type: TokenType.PASSWORD_RESET,
      },
    });

    if (!existingToken) {
      throw new NotFoundError('Reset password token not found. Please ensure you have the correct token.');
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new BadRequestError('Reset password token has expired. Please request a new confirmation token.');
    }

    const existingUser = await userService.findByEmail(existingToken.email);

    if (!existingUser) {
      throw new NotFoundError('User not found. Please check the entered email address and try again.');
    }

    if (existingUser.password) {
      const isCurrentPassword = await verify(existingUser.password, dto.password);

      if (isCurrentPassword) {
        throw new BadRequestError('New password cannot be the same as your current password.');
      }
    }

    const historyLimit = 5;
    const passwordHistory = await prisma.passwordHistory.findMany({
      where: {userId: existingUser.id},
      orderBy: {createdAt: 'desc'},
      take: historyLimit,
    });

    for (const entry of passwordHistory) {
      const isMatched = await verify(entry.hash, dto.password);
      if (isMatched) {
        throw new BadRequestError('You cannot use a recently used password. Please choose a different one.');
      }
    }

    const newPasswordHash = await hash(dto.password);

    const transactionOperations: any[] = [
      // Обновляем пароль пользователя на новый
      prisma.user.update({
        where: {id: existingUser.id},
        data: {password: newPasswordHash},
      }),
      // Удаляем использованный токен
      prisma.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.PASSWORD_RESET
        },
      })
    ];

    // Переносим старый пароль в историю ТОЛЬКО если он был задан
    if (existingUser.password) {
      transactionOperations.unshift(
        prisma.passwordHistory.create({
          data: {
            userId: existingUser.id,
            hash: existingUser.password,
          }
        })
      );
    }

    // Выполняем транзакцию
    await prisma.$transaction(transactionOperations);

    await this.cleanOldPasswordHistory(existingUser.id, historyLimit);

    return true;
  }

  /**
   * Удаляет записи истории паролей, выходящие за рамки лимита.
   * @param userId - id нужного пользователя.
   * @param limit - лимит записей, которые останутся в БД.
   */
  private async cleanOldPasswordHistory(userId: string, limit: number) {
    const historyCount = await prisma.passwordHistory.count({
      where: {userId}
    });

    if (historyCount > limit) {
      const activeRecords = await prisma.passwordHistory.findMany({
        where: {userId},
        orderBy: {createdAt: 'desc'},
        take: limit,
        select: {id: true}
      });

      const activeIds = activeRecords.map(r => r.id);

      await prisma.passwordHistory.deleteMany({
        where: {
          userId,
          id: {notIn: activeIds}
        }
      });
    }
  }

  /**
   * Генерирует новый токен для сброса почты.
   * @param email - Адрес электронной почты пользователя.
   * @returns Объект токена подтверждения.
   */
  private async generatePasswordResetToken(email: string) {
    const token = uuidv4();
    const expiredIn = new Date(new Date().getTime() + 3600 * 1000); // + 1час

    const existingToken = await prisma.token.findFirst({
      where: {
        email: email,
        type: TokenType.PASSWORD_RESET
      }
    });

    // Если старый токен существовал — удаляем его
    if (existingToken) {
      await prisma.token.deleteMany({
        where: {
          email: email,
          type: TokenType.PASSWORD_RESET
        },
      });
    }

    // Создаем новый токен
    const verificationToken = await prisma.token.create({
      data: {
        email: email,
        token: token,
        expiresIn: expiredIn,
        type: TokenType.PASSWORD_RESET
      }
    });

    return verificationToken;
  }
}

export const passwordRecoveryService = new PasswordRecoveryService();