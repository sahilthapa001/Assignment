import { createAsyncThunk } from "@reduxjs/toolkit";
import SahilAxios from "../../config/axiosConfig";
import { AxiosError } from "axios";

export const loginAsync = createAsyncThunk(
  "user/login", // name of the action
  async (loginData) => {
    try {
      const response = await SahilAxios.post("/api/auth/login", loginData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Login failed: " + error.response?.data.message);
      } else {
        return Promise.reject();
      }
    }
  }
);

export const autoLoginAsync = createAsyncThunk("user/autoLogin", async () => {
  try {
    const response = await SahilAxios.get("/user", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error("Login failed: " + error.response?.data.message);
    } else {
      return Promise.reject();
    }
  }
});

export const createUserAsync = createAsyncThunk(
  "user/create",
  async (loginData) => {
    try {
      const response = await SahilAxios.post("/api/auth/signup", loginData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Create failed: " + error.response?.data.message);
      } else {
        return Promise.reject();
      }
    }
  }
);

export const activateUserAsync = createAsyncThunk(
  "user/active",
  async (token) => {
    try {
      const response = await SahilAxios.get(`/user/activation/${token}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Login failed: " + error.response?.data.message);
      } else {
        return Promise.reject();
      }
    }
  }
);
