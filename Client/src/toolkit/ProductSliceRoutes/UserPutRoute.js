// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = "https://happybasket.onrender.com/api";

// export const updateProduct = createAsyncThunk(
//   "products/updateProduct",
//   async ({ id, updatedData }, { rejectWithValue }) => {
//     console.log(updatedData,'updatedData')
//     try {
//       const formData = new FormData();
//       formData.append("title", updatedData.Title);
//       formData.append("category", updatedData.Category);
//       formData.append("description", updatedData.Description);
//       formData.append("cost", updatedData.Cost);
//       formData.append("editorName", updatedData.EditorName);

//       if (updatedData.image) {
//         // If the user updated the image
//         formData.append("image", updatedData.image);
//       }

//       console.log(formData,'formData')
//       const response = await axios.put(`${BASE_URL}/userPut/${id}`, formData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const userPutSlice = createSlice({
//   name: "updateProduct",
//   initialState: {
//     data: null,
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateProduct.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = action.payload;
//       })
//       .addCase(updateProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export default userPutSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://happybasket.onrender.com/api";

// PUT: Update Product
export const updateProduct = createAsyncThunk(  
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    console.log({ id, updatedData }, "{ id, updatedData }");
    try {
      const formData = new FormData();
      formData.append("title", updatedData.Title);
      formData.append("category", updatedData.Category);
      formData.append("description", updatedData.Description);
      formData.append("cost", updatedData.Cost);
      formData.append("editorName", updatedData.EditorName);

      if (updatedData.image) {
        // If user selects a new image
        formData.append("image", updatedData.image);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // console.log(formData, "formData");
      const response = await axios.put(`${BASE_URL}/userPut/${id}`, formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState: {
    data: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default updateProductSlice.reducer;
