import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://happybasket.onrender.com/api/userGet/`);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const userGetSlice = createSlice({
    name: "getProducts",
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export default userGetSlice.reducer;
