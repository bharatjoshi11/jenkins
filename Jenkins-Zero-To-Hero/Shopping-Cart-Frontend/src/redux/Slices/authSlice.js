import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { auth_api } from "../api";

const initialState = {
  accessToken: "",
  refreshToken: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  genToken: false,
};

export const generateToken = createAsyncThunk(
  "auth/generateToken",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/generate-token', {
        refreshToken,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/signup', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      return response.data.msg;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/login', {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.accessToken;
      if (token) {
        return {
          ...state,
          accessToken: token,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.clear();
      newrelic.setUserId(null);
      newrelic.setCustomAttribute("email", null);
      newrelic.setCustomAttribute("Name", null);
     
      return {
        ...state,
        _id: "",
        accessToken: "",
        refreshToken: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder
      .addCase(registerUser.pending, (state, action) => {
        return {
          ...state,
          loginStatus: "",
          loginError: "",
          registerStatus: "pending",
        };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        return {
          ...state,
          loginStatus: "",
          loginError: "",
          registerStatus: "success",
          registerError: "",
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        return {
          ...state,
          loginStatus: "",
          loginError: "",
          userLoaded: false,
          registerStatus: "rejected",
          registerError: action.payload,
        };
      });

    // Login User
    builder
      .addCase(loginUser.pending, (state, action) => {
        return { ...state, loginStatus: "pending" };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          loginError: "",
          loginStatus: "success",
          userLoaded: true,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          userLoaded: false,
          loginStatus: "rejected",
          loginError: action.payload,
        };
      });

    // Generate Token
    builder
      .addCase(generateToken.pending, (state, action) => {
        return { ...state, genToken: false };
      })
      .addCase(generateToken.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            accessToken: action.payload.accessToken,
            genToken: true,
          };
        } else return state;
      })
      .addCase(generateToken.rejected, (state, action) => {
        return { ...state, genToken: false };
      });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
