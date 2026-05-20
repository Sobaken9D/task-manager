import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice.ts";

export const store = configureStore({
  reducer: {
    category: categoryReducer
  }
});

// Получаем типы стора и диспатча
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;