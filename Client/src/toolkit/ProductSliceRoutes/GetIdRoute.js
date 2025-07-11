import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://happybasket.onrender.com/api';

export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (id, { rejectWithValue }) => {
        console.log(id)
        try {
            const response = await axios.get(`${BASE_URL}/userGet/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const getIdSlice = createSlice({
    name: "getProductById",
    initialState: {
        data: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export default getIdSlice.reducer;
