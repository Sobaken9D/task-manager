import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {
  TFormDeleteAccountValues,
  TFormUpdateSettingsValues,
} from "@/shared/schemas/auth-schema.ts";
import {getRejectValue} from "@/lib/utils/reject-value.ts";
import {Api} from "@/services/api-client.ts";

export interface ProfileError {
  message: string;
  status?: number;
}

interface ProfileState {
  loading: boolean;
  error: ProfileError | null;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
};

/**
 * Асинхронный экшен для обновления настроек пользователя на бэкенде.
 */
export const updateSettings = createAsyncThunk(
  "profile/updateSettings",
  async (dto: TFormUpdateSettingsValues, {rejectWithValue}) => {
    try {
      return await Api.profile.updateSettings(dto);
    } catch (error) {
      return rejectWithValue(getRejectValue(error, "updateSettings"));
    }
  }
);

/**
 * Асинхронный экшен для удаления аккаунта.
 */
export const deleteUser = createAsyncThunk(
  "profile/deleteAccount",
  async (dto: TFormDeleteAccountValues, {rejectWithValue}) => {
    try {
      return await Api.profile.deleteUser(dto);
    } catch (error) {
      return rejectWithValue(getRejectValue(error, "deleteUser"));
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ОБНОВЛЕНИЕ НАСТРОЕК
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ProfileError;
      })

      // УДАЛЕНИЕ АККАУНТА
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ProfileError;
      });
  },
});

export default profileSlice.reducer;