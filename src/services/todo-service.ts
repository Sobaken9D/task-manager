import type {
  ResponseGetTodosWithMessageDto,
  ResponseTodoWithMessageDto
} from "@/services/dto/todo-dto.ts";
import {AbstractService} from "@/services/abstract-service.ts";
import {axiosInstance} from "@/services/axios-instance.ts";
import type {UpdateTodoDto} from "../../server/src/services/dto/todo-dto.ts";

class TodoService extends AbstractService{
  constructor() {
    super('/todo');
  }

  // здесь мы пишем <TodoDto> исключительно для себя, т.е:
  // 1)для автодополнений
  // 2)для документации кода
  // 3)для защиты от ошибок

  // Получение всех задач пользователя
  public async getTodo(): Promise<ResponseGetTodosWithMessageDto> {
    try {
      // без axios пришлось бы использовать fetch, прописывать method, headers и тд.
      const {data} = await axiosInstance.get<ResponseGetTodosWithMessageDto>(this.url);
      return data;
    } catch (error) {
      throw this.handleError(error, 'GET_TODO');
    }
  }

  // Удаление задачи пользователя по id
  public async deleteTodo(id: string): Promise<ResponseTodoWithMessageDto> {
    try {
      const {data} = await axiosInstance.delete<ResponseTodoWithMessageDto>(`${this.url}/${id}`);
      return data;
    } catch (error) {
      throw this.handleError(error, 'DELETE_TODO');
    }
  }

  // Добавление задачи
  public async addTodo(description: string): Promise<ResponseTodoWithMessageDto> {
    try {
      const {data} = await axiosInstance.post<ResponseTodoWithMessageDto>(this.url, {description});
      return data;
    } catch (error) {
      throw this.handleError(error, 'ADD_TODO');
    }
  }

  // Обновление задачи (редактирование описания или статуса задачи)
  public async updateTodo({ dto, id }: { dto: UpdateTodoDto; id: string }): Promise<ResponseTodoWithMessageDto> {
    try {
      const {data} = await axiosInstance.patch<ResponseTodoWithMessageDto>(`${this.url}/${id}`, {dto});
      return data;
    } catch (error) {
      throw this.handleError(error, 'UPDATE_TODO');
    }
  }
}

export const todoApi = new TodoService();