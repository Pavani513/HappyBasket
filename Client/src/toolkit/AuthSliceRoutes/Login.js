import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Thunk for user login
export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://happybasket.onrender.com/api/login", credentials);


            // ✅ Store user ID in cookies
            Cookies.set("userId", response.data.user._id, { expires: 1 });

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
            // ✅ Remove cookies on logout
            Cookies.remove("token");
            Cookies.remove("userId");
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
