import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CategoryState {
  activeId: number,
}

const initialState: CategoryState = {
  activeId: 0,
}

// Мутации (state.value += 1)
// Важный момент: В обычном Redux нельзя менять state напрямую.
// Но внутри createSlice используется библиотека Immer.
// Она позволяет тебе писать код так, будто ты мутируешь объект, а на самом деле она сама создает "иммутабельную копию" под капотом.
// Это очень удобно.

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<number>) => {
      state.activeId = action.payload;
    },
  },
})

// counterSlice.actions — это объект со всеми функциями из reducers.
//
// counterSlice.reducer — это готовый редьюсер, который ты потом подключишь в configureStore.

export const {setActiveId} = categorySlice.actions;

export default categorySlice.reducer;