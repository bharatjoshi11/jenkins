// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { order_api } from "../api";

// const initialState = {
//     orderedProducts: [],
//     orderCreatedMsg: "",
//     orderCreated: false,
//     ordersLoaded: false,
//     status: "",
//     error: ""
// }

// export const getErrorOrders = createAsyncThunk(
//     "orders/get",
//     async (items, { rejectWithValue }) => {
//         try {
//             const accessToken = localStorage.getItem("accessToken");
//             const response = await axios.get(`${order_api}/api/v1/error`,
//                 {
//                     headers: {
//                         authorization: `${accessToken}`,
//                     }
//                 });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// export const getErrorOrders2 = createAsyncThunk(
//     "orders/get",
//     async (items, { rejectWithValue }) => {
//         try {
//             const accessToken = localStorage.getItem("accessToken");
//             const response = await axios.get(`${order_api}/api/v1/error2`,
//                 {
//                     headers: {
//                         authorization: `${accessToken}`,
//                     }
//                 });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// export const getErrorOrders3 = createAsyncThunk(
//     "orders/get",
//     async (items, { rejectWithValue }) => {
//         try {
//             const accessToken = localStorage.getItem("accessToken");
//             const response = await axios.get(`${order_api}/api/v1/error3`,
//                 {
//                     headers: {
//                         authorization: `${accessToken}`,
//                     }
//                 });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// const errorSlice = createSlice({
//     name: "errors",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // getOrders
//             .addCase(getErrorOrders.pending, (state, action) => {
//                 return {
//                     ...state,
//                     status: 'loading'
//                 }
//             })
//             .addCase(getErrorOrders.fulfilled, (state, action) => {
//                 state.status = "succeded";
//                 state.orderedProducts = action.payload;
//                 state.ordersLoaded = true;
//             })
//             .addCase(getErrorOrders.rejected, (state, action) => {
//                 return {
//                     ...state,
//                     status: 'rejected',
//                     ordersLoaded: false,
//                     error: action.error.message
//                 }
//             })
//             .addCase(getErrorOrders2.pending, (state, action) => {
//                 return {
//                     ...state,
//                     status: 'loading'
//                 }
//             })
//             .addCase(getErrorOrders2.fulfilled, (state, action) => {
//                 state.status = "succeded";
//                 state.orderedProducts = action.payload;
//                 state.ordersLoaded = true;
//             })
//             .addCase(getErrorOrders2.rejected, (state, action) => {
//                 return {
//                     ...state,
//                     status: 'rejected',
//                     ordersLoaded: false,
//                     error: action.error.message
//                 }
//             })
//             .addCase(getErrorOrders3.pending, (state, action) => {
//                 return {
//                     ...state,
//                     status: 'loading'
//                 }
//             })
//             .addCase(getErrorOrders3.fulfilled, (state, action) => {
//                 state.status = "succeded";
//                 state.orderedProducts = action.payload;
//                 state.ordersLoaded = true;
//             })
//             .addCase(getErrorOrders3.rejected, (state, action) => {
//                 return {
//                     ...state,
//                     status: 'rejected',
//                     ordersLoaded: false,
//                     error: action.error.message
//                 }
//             })
//     }
// });

// export default errorSlice.reducer;