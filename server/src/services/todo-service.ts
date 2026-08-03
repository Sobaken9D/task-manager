// В сервис (todo.service.ts) переносится вся работа с базой данных (Prisma) и проверки бизнес-логики (принадлежит ли задача пользователю, существует ли она).

import {prisma} from "@/prisma/prisma-client.ts";
import type {UpdateTodoDto} from "./dto/todo-dto";

class TodoService {
  /**
   * Получить все задачи конкретного пользователя
   * @param userId - идентификатор пользователя
   */
  public async getAll(userId: string) {
    return prisma.todo.findMany({
      where: {
        userId: userId
      }
    });
  };

  /**
   * Создать новую задачу
   * @param userId - идентификатор пользователя
   * @param description - описание задачи
   */
  public async create(userId: string, description: string) {
    return prisma.todo.create({
      data: {
        userId: userId,
        description: description,
        isCompleted: false
      }
    });
  };

  /**
   * Удалить задачу с проверкой прав владельца
   * @param id - идентификатор задачи
   * @param userId - идентификатор пользователя
   */
  public async delete(id: string, userId: string) {
    try {
      return await prisma.todo.delete({
        where: {
          id: id,
          userId: userId
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Обновить задачу (текст или статус выполнения)
   * @param id - идентификатор задачи
   * @param userId - идентификатор пользователя
   * @param dto - объект с обновленными данными
   */
  public async update(id: string, userId: string, dto: UpdateTodoDto) {
    try {
      return await prisma.todo.update({
        where: {
          id: id,
          userId: userId,
        },
        data: dto, // Передаем объект DTO напрямую
      });
    } catch (error) {
      throw error;
    }
  }
}

export const todoService = new TodoService();