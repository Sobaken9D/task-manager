// В сервис (todo.service.ts) переносится вся работа с базой данных (Prisma) и проверки бизнес-логики (принадлежит ли задача пользователю, существует ли она).

import {prisma} from "@/prisma/prisma-client.ts";
import {ForbiddenError, NotFoundError} from "@/shared/utils/errors";

class TodoService {
  /**
   * Получить все задачи конкретного пользователя
   * @param userId - идентификатор пользователя
   */
  public async getAll(userId: string) {
    const todos = await prisma.todo.findMany({
      where: {
        userId: userId
      }
    });

    return todos;
  };

  /**
   * Создать новую задачу
   * @param userId - идентификатор пользователя
   * @param description - описание задачи
   */
  public async create(userId: string, description: string) {
    const newTodo = await prisma.todo.create({
      data: {
        userId: userId,
        description: description,
        isCompleted: false
      }
    });

    return newTodo;
  };

  /**
   * Удалить задачу с проверкой прав владельца
   * @param id - идентификатор задачи
   * @param userId - идентификатор пользователя
   */
  public async delete(id: string, userId: string) {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id
      }
    });

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    if (todo.userId !== userId) {
      throw new ForbiddenError('You are not allowed to delete this todo');
    }

    return await prisma.todo.delete({
      where: {
        id: id
      }
    });
  }

  /**
   * Обновить задачу (текст или статус выполнения)
   * @param id - идентификатор задачи
   * @param userId - идентификатор пользователя
   * @param description - описание задачи
   */
  public async update(id: string, userId: string, description?: string) {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id
      }
    });

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    if (todo.userId !== userId) {
      throw new ForbiddenError('You are not allowed to delete this todo');
    }

    const updatedData: Partial<typeof todo> = {};

    if (description !== undefined) {
      updatedData.description = description;
    } else {
      updatedData.isCompleted = !todo.isCompleted;
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: id
      },
      data: updatedData
    });

    return updatedTodo;
  }
}

export const todoService = new TodoService();