import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// Thunk for user login
export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, credentials);
            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: {
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
