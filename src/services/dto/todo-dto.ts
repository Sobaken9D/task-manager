import type {Todo} from "@/generated/prisma/client.ts";

// export type TodoDto = Partial<Todo>;
export type TodoDto = Pick<Todo, "id" | "description" | "isCompleted">;

export interface ResponseGetTodosWithMessageDto {
  message: string;
  data: TodoDto[];
}

export interface ResponseTodoWithMessageDto {
  message: string;
  data?: TodoDto;
}