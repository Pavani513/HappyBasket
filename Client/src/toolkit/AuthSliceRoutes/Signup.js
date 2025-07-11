import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://happybasket.onrender.com/api";

// Thunk for user registration
export const registerUser = createAsyncThunk(
    "signup/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/userPost`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState: {
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default signupSlice.reducer;
