import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const postProduct = createAsyncThunk(
    "products/postProduct",
    async (newProduct, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/userPost`, newProduct);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const userPostSlice = createSlice({
    name: "postProduct",
    initialState: {
        data: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(postProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(postProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export default userPostSlice.reducer;
