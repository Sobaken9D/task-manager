import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {Api} from "@/services/api-client.ts";
import type {TodoDto} from "@/services/dto/todo-dto.ts";
import {getRejectValue} from "@/lib/utils/reject-value.ts";


interface TodoState {
  items: TodoDto[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null
}

// createAsyncThunk — это функция из библиотеки Redux Toolkit,
// предназначенная для обработки асинхронных операций (например, запросов к API)
// первый аргумент - строка, которая определяет тип action
// второй аргумент - асинхронная функция, которая возвращает промис или выполняет асинхронную операцию

/**
 * Асинхронный экшен для получения всех todo пользователя.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @returns Промис со списком задач при успешном выполнении.
 */
export const fetchTodo = createAsyncThunk(
  'todo/fetchTodo',
  async (_, {rejectWithValue}) => {
    try {
      return await Api.todo.getTodo();
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'fetchTodo'));
    }
  }
);

/**
 * Асинхронный экшен для удаления todo по id.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @param id - Идентификатор удаляемой задачи.
 * @returns id удаленной задачи.
 */
export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: string, {rejectWithValue}) => {
    try {
      await Api.todo.deleteTodo(id);

      // Возвращаем ID удаленной задачи, чтобы убрать её из стейта
      return id;
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'deleteTodo'));
    }
  }
);

/**
 * Асинхронный экшен для добавления todo.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @param description - Описание добавляймой задачи.
 * @returns Промис с сообщением и данными todo с при успешном выполнении.
 */
export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async (description: string, {rejectWithValue}) => {
    try {
      return await Api.todo.addTodo(description);
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'addTodo'));
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  // описание синхронных действий
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ПОЛУЧЕНИЕ
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // УДАЛЕНИЕ
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ДОБАВЛЕНИЕ
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.data) {
          state.items.push(action.payload.data);
        }
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
});

export default todoSlice.reducer;