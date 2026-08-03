import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {Api} from "@/services/api-client.ts";
import type {ConfirmationDto} from "@/services/dto/auth-dto.ts";
import {getRejectValue} from "@/lib/utils/reject-value.ts";
// import type {User} from "@/generated/prisma/client.ts";
import type {
  TFormForgotPasswordValues, TFormLoginValues,
  TFormRegisterValues, TFormResetPasswordValues
} from "@/shared/schemas/auth-schema.ts";

export interface AuthError {
  message: string;
  status?: number;
}

interface AuthState {
  loading: boolean;
  error: AuthError | null;
  isCheckedSession: boolean; // проверил ли сервер сессию при старте приложения
  isAuthenticated: boolean;
  // user: User | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  isCheckedSession: false,
  isAuthenticated: false,
  // user: null,
};

// createAsyncThunk — это функция из библиотеки Redux Toolkit,
// предназначенная для обработки асинхронных операций (например, запросов к API)
// первый аргумент - строка, которая определяет тип действия
// второй аргумент - асинхронная функция, которая возвращает промис или выполняет асинхронную операцию

/**
 * Асинхронный экшен для проверки авторизации на основе сессии.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @returns Промис сообщением и data (user | null).
 */
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, {rejectWithValue}) => {
    try {
      return await Api.auth.checkAuth();
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'checkAuth'));
    }
  }
);

/**
 * Асинхронный экшен для верификация Email.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @param dto - Объект с токеном.
 * @returns Промис с сообщением об успешном подтверждении почты и данными сессии в поле data.
 */
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (dto: ConfirmationDto, {rejectWithValue}) => {
    try {
      return await Api.auth.verifyEmail(dto);
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'verifyEmail'));
    }
  }
);

/**
 * Асинхронный экшен для регистрации пользователя.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @param data - Объект с формой регистрации.
 * @returns Промис с сообщением об успешной регистрации и дополнительными данными.
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: TFormRegisterValues, {rejectWithValue}) => {
    try {
      return await Api.auth.registerUser(data);
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'registerUser'));
    }
  }
);

/**
 * Асинхронный экшен для входа пользователя.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @param data - Объект с формой логина.
 * @returns Промис с сообщением об успешном входе и дополнительными данными.
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: TFormLoginValues, {rejectWithValue}) => {
    try {
      return await Api.auth.loginUser(data);
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'loginUser'));
    }
  }
);

/**
 * Асинхронный экшен для выхода пользователя.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @returns Промис с сообщением об успешном входе и дополнительными данными.
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      return await Api.auth.logoutUser();
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'logoutUser'));
    }
  }
);

/**
 * Асинхронный экшен для отправки письма восстановления пароля на почту.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @param data - Объект с формой.
 * @returns Промис с сообщением об успешном входе и дополнительными данными.
 */
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: TFormForgotPasswordValues, {rejectWithValue}) => {
    try {
      return await Api.auth.forgotPassword(data);
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'forgotPassword'));
    }
  }
);

/**
 * Асинхронный экшен для создания нового пароля.
 * При ошибке возвращает ошибку через rejectWithValue.
 * @param data - Объект с формой.
 * @returns Промис с сообщением об успешном входе и дополнительными данными.
 */
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    {form, token}: {
      form: TFormResetPasswordValues,
      token: string
    }, {rejectWithValue}) => {
    try {
      return await Api.auth.resetPassword(form, token);
    } catch (error) {
      return rejectWithValue(getRejectValue(error, 'resetPassword'));
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  // описание синхронных действий
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // ПРОВЕРКА АВТОРИЗАЦИИ
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.data;
        state.isCheckedSession = true;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
        state.isCheckedSession = true;
        state.isAuthenticated = false;
      })

      // ПОДТВЕРЖДЕНИЕ ПОЧТЫ
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.data.user;
        state.isCheckedSession = true;
        state.isAuthenticated = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
        state.isCheckedSession = true;
        state.isAuthenticated = false;
      })

      // РЕГИСТРАЦИЯ
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
      })

      // ВХОД
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.data;
        state.isCheckedSession = true;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
        state.isCheckedSession = true;
        state.isAuthenticated = false;
      })

      // ВЫХОД
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
      })

      // ЗАБЫЛИ ПАРОЛЬ
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
      })

      // ВОССТАНОВЛЕНИЕ ПАРОЛЯ
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
      })
  }
});

export const {clearAuthError} = authSlice.actions;
export default authSlice.reducer;