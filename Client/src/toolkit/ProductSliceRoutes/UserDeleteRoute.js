import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
      
        try {
          console.log(id)
          const response =  await axios.delete(`${BASE_URL}/userDelete/${id}`);
          return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const userDeleteSlice = createSlice({
    name: "deleteProduct",
    initialState: {
        data: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload; // returns deleted ID
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export default userDeleteSlice.reducer;
