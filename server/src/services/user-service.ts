// import {type Request, type Response} from "express";
import {hash, verify} from "argon2";
import {prisma} from "../../../prisma/prisma-client";
import {AuthMetod} from "../../../generated/prisma/enums";
import {
  BadRequestError,
  NotFoundError,
} from "../../../shared/utils/errors";
import type {
  TFormUpdateSettingsValues
} from "../../../shared/schemas/auth-schema";


class UserService {

  /**
   * Находит пользователя по ID.
   * @param id - ID пользователя.
   * @returns Найденный пользователь.
   */
  public async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        accounts: true,
        settings: true
      }
    });

    if (!user) {
      throw new NotFoundError('User not found. Please check the information you entered.');
    }

    return user;
  }

  /**
   * Находит пользователя по email.
   * @param email - Email пользователя.
   * @returns Найденный пользователь или null, если не найден.
   */
  public async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email: email
      },
      include: {
        accounts: true,
        settings: true
      }
    });
  }

  /**
   * Создает нового пользователя.
   * @param email - Email пользователя.
   * @param password - Пароль пользователя.
   * @param name - Отображаемое имя пользователя.
   * @param image - URL аватара пользователя.
   * @param method - Метод аутентификации пользователя.
   * @param isVerified - Флаг, указывающий, подтвержден ли email пользователя.
   * @returns Созданный пользователь.
   */
  public async create(
    email: string,
    password: string | null,
    name: string,
    image: string,
    method: AuthMetod, // Замени any на свой тип из Prisma (например, AuthMethod)
    isVerified: boolean
  ) {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password ? await hash(password) : '',
        name: name,
        image: image,
        method: method,
        isVerified: isVerified,
        settings: {
          create: {}
        }
      },
      include: {
        accounts: true,
        settings: true
      }
    });

    return user;
  }

  /**
   * Удаляет пользователя.
   * @param id - id пользователя.
   * @param password - Пароль пользователя.
   * @returns true, если пользователь удален.
   */
  public async delete(id: string, password: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundError('User not found. Please check the entered details.');
    }

    if (!user.password) {
      throw new BadRequestError(`This account was registered via ${user.method}. Please create a password first.`);
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new BadRequestError('Incorrect password. Please try again or reset your password if you have forgotten it.')
    }

    await prisma.user.delete({
      where: {
        id: id
      },
    });

    return true;
  }

  /**
   * Обновление настроек пользователя.
   * @param id - id пользователя.
   * @returns true, если настройки обновились.
   */
  public async updateSettings(dto: TFormUpdateSettingsValues,  id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundError('User not found. Please check the entered details.');
    }

    if (!user.settings) {
      throw new NotFoundError('User not found. Please check the entered details.');
    }

    await prisma.userSettings.update({
      where: {
        userId: id,
      },
      data: dto,
    });

    return true;
  }
}

export const userService = new UserService();