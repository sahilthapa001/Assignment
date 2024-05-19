import { createSlice } from "@reduxjs/toolkit";
import {
  loginAsync,
  createUserAsync,
  activateUserAsync,
  autoLoginAsync,
} from "../actions/user";

const initialState = {
  loading: "idle",
  isAuthenticated: false,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(createUserAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(activateUserAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(activateUserAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(activateUserAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(autoLoginAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(autoLoginAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(autoLoginAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default userSlice.reducer;
