// В роутере (todo-route.ts) должен остаться только HTTP-слой: приём запроса, вызов нужного метода сервиса и отправка JSON-ответа с правильным статус-кодом.

import {Router} from 'express';
import {
  authenticateTokenMiddleware
} from "../middlewares/auth-middleware";
import {todoService} from "../services/todo-service";
import {BadRequestError} from "@/shared/utils/errors";


export const todoRouter = Router();

// Защищаем все роуты задач этим middleware
todoRouter.use(authenticateTokenMiddleware);

// GET
todoRouter.get('/', async (req, res, next) => {
  try {
    const todos = await todoService.getAll(req.user!.id);
    // return res.json(todos);

    return res.status(200).json({
      message: 'Todos gets successfully.',
      data: todos
    });
  } catch (error) {
    next(error);
  }
});

// DELETE
todoRouter.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const {id} = req.params;

    if (typeof id !== 'string') {
      return next(new BadRequestError('Invalid ID format'));
    }

    const deletedTodo = await todoService.delete(id, userId);

    return res.status(200).json({
      message: 'Todo deleted successfully.',
      data: deletedTodo
    });
  } catch (error) {
    next(error);
  }
})

// POST
todoRouter.post('/', async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const {description} = req.body;

    if (!description || description.trim() === '') {
      return next(new BadRequestError("Description is required"));
    }

    const createdTodo = await todoService.create(userId, description);

    return res.status(201).json({
      message: 'Todo created successfully.',
      data: createdTodo
    });
  } catch (error) {
    next(error);
  }
});

// PATCH
todoRouter.patch('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const userId = req.user!.id;
    const {dto} = req.body;

    const updatedTodo = await todoService.update(id, userId, dto);

    // Возвращаем статус 200
    return res.status(200).json({
      message: 'Todo updated successfully.',
      data: updatedTodo
    });
  } catch (error) {
    next(error);
  }
})