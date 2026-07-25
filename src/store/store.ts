import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice.ts";
import todoReducer from "./features/todoSlice.ts";
import authReducer from "./features/authSlice.ts";
// import profileReducer from "./features/profileSlice.ts";
import uiReducer from "./features/uiSlice.ts";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    todo: todoReducer,
    auth: authReducer,
    // profile: userReducer,
    ui: uiReducer,
  }
});

// Получаем типы стора, диспатча, стейта
export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Создаем и экспортируем строго типизированный диспатч для функций вне React (top-loader)
export const loaderDispatch: AppDispatch = store.dispatch;