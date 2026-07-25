// В роутере (todo-route.ts) должен остаться только HTTP-слой: приём запроса, вызов нужного метода сервиса и отправка JSON-ответа с правильным статус-кодом.

import {Router} from 'express';
import {
  authenticateTokenMiddleware
} from "../middlewares/auth-middleware";
import {todoService} from "../services/todo-service";
import {BadRequestError, UnauthorizedError} from "@/shared/utils/errors";



export const todoRouter = Router();

// Защищаем все роуты задач этим middleware
todoRouter.use(authenticateTokenMiddleware);

// GET
todoRouter.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      // return res.status(401).json({error: "Unauthorized"});
      return next(new UnauthorizedError());
    }

    const todos = await todoService.getAll(req.user.id);
    return res.json(todos);
  } catch (error) {
    next(error);
  }
});

// DELETE
todoRouter.delete('/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      // return res.status(401).json({error: "Unauthorized"});
      return next(new UnauthorizedError());
    }

    const userId = req.user.id;
    const {id} = req.params;

    if (typeof id !== 'string') {
      // return res.status(400).json({error: 'Invalid ID format'});
      return next(new BadRequestError('Invalid ID format'));
    }

    const deletedTodo = await todoService.delete(id, userId);

    // Возвращаем статус 200
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
    if (!req.user) {
      // return res.status(401).json({error: "Unauthorized"});
      return next(new UnauthorizedError());
    }

    const userId = req.user.id;
    const {description} = req.body;

    if (!description || description.trim() === '') {
      // return res.status(400).json({error: "Description is required"}); // 400 - сервер не может обработать запрос из-за неверного синтаксиса или ошибки со стороны клиента
      return next(new BadRequestError("Description is required"));
    }

    const createdTodo = await todoService.create(userId, description);

    return res.status(201).json({
      message: 'Todo post successfully.',
      data: createdTodo
    }); // 201 - успешное выполнение запроса, приведшее к созданию нового ресурса
  } catch (error) {
    next(error);
  }
});

// PATCH
todoRouter.patch('/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      // return res.status(401).json({error: "Unauthorized"});
      return next(new UnauthorizedError());
    }

    const {id} = req.params;
    const userId = req.user.id;
    const {description} = req.body;

    if (typeof id !== 'string') {
      // return res.status(400).json({error: 'Invalid ID format'});
      return next(new BadRequestError('Invalid ID format'));
    }

    const updatedTodo = await todoService.update(id, userId, description);

    // Возвращаем статус 200
    return res.status(200).json({
      message: 'Todo patch successfully.',
      data: updatedTodo
    });
  } catch (error) {
    next(error);
  }
})