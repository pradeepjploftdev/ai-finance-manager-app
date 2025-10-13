import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser as registerApi, 
  loginUser as loginApi,
loggedInUser as loggedInUserApi,
logoutUser as logoutUserApi } from '../../api/backend_helper';

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginApi(userData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await loggedInUserApi()
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Not authenticated");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutUserApi()
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed! ");
    }
  }
);