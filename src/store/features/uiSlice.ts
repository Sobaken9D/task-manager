import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Theme, Language} from "@/generated/prisma/client.ts";
import {
  loginUser,
  logoutUser,
  verifyEmail
} from "@/store/features/authSlice.ts";

// Вспомогательные функции, чтобы не дублировать код
const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme") as Theme;
  if (saved) return saved;

  // Если зашел впервые — ставим дефолт и сохраняем
  localStorage.setItem("theme", "LIGHT");
  return "LIGHT";
};

const getInitialLanguage = (): Language => {
  const saved = localStorage.getItem("language") as Language;
  if (saved) return saved;

  localStorage.setItem("language", "RUSSIAN");
  return "RUSSIAN";
};

interface UiState {
  theme: Theme;
  language: Language;
}

const initialState: UiState = {
  theme: getInitialTheme(),
  language: getInitialLanguage(),
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Вызывается при ручном переключении в UI
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    }
  },
  extraReducers: (builder) => {
    builder

      // Слушаем успешный логин и обновляем UI
      .addCase(loginUser.fulfilled, (state, action) => {
        const userSettings = action.payload.data?.user?.settings;
        if (userSettings) {
          state.theme = userSettings.theme;
          state.language = userSettings.language;
          localStorage.setItem("theme", userSettings.theme);
          localStorage.setItem("language", userSettings.language);
        }
      })

      // Слушаем успешную верификацию и обновляем UI
      .addCase(verifyEmail.fulfilled, (state, action) => {
        const userSettings = action.payload.data?.user?.settings;
        if (userSettings) {
          state.theme = userSettings.theme;
          state.language = userSettings.language;
          localStorage.setItem("theme", userSettings.theme);
          localStorage.setItem("language", userSettings.language);
        }
      })

      // Слушаем успешный logout и сбрасываем настройки к дефолту
      .addCase(logoutUser.fulfilled, (state) => {
        state.theme = "DARK";
        state.language = "RUSSIAN";

        localStorage.setItem("theme", "DARK");
        localStorage.setItem("language", "RUSSIAN");
      })
  }
});

export const {
  setTheme,
  setLanguage
} = uiSlice.actions;
export default uiSlice.reducer;