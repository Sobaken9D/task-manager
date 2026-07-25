import type {Todo} from "@/generated/prisma/client.ts";

// export type TodoDto = Partial<Todo>;
export type TodoDto = Pick<Todo, "id" | "description" | "isCompleted">;

// export interface TodoDto {
//   id?: string;
//   description?: string;
//   isCompleted?: boolean;
// }

export interface ResponseTodoWithMessageDto {
  message: string;
  data?: TodoDto;
}