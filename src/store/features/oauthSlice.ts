// import {
//   createAsyncThunk,
//   createSlice,
// } from "@reduxjs/toolkit";
// import {Api} from "@/services/api-client.ts";
// import {getRejectValue} from "@/lib/utils/reject-value.ts";
//
// export interface OauthError {
//   message: string;
//   status?: number;
// }
//
// interface OauthState {
//   loading: boolean;
//   error: OauthError | null;
// }
//
// const initialState: OauthState = {
//   loading: false,
//   error: null
// };
//
// export const oauth = createAsyncThunk(
//   'auth/oauth',
//   async (providerName: string, {rejectWithValue}) => {
//     try {
//       return await Api.oauth.oauth(providerName);
//     } catch (error) {
//       return rejectWithValue(getRejectValue(error, 'oauth'));
//     }
//   }
// );
//
//
// export const oauthSlice = createSlice({
//   name: "oauth",
//   initialState: initialState,
//   // описание синхронных действий
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//
//       .addCase(oauth.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(oauth.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(oauth.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as OauthError;
//       })
//   }
// });
//
// export default oauthSlice.reducer;