import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "creation/createProduct",
  async ({ formData, image, editorName }, { rejectWithValue }) => {
    console.log({ formData, image, editorName },'{ formData, image, editorName }')
    try {
      const data = new FormData();
      data.append("image", image);
      data.append("Title", formData.title);
      data.append("Category", formData.category);
      data.append("Description", formData.description);
      data.append("Cost", formData.cost);
      data.append("EditorName", editorName);

       // Debug FormData contents:
            for (let pair of data.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }

      const response = await axios.post(
        "http://localhost:3000/api/productPost",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const creationSlice = createSlice({
  name: "creation",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default creationSlice.reducer;
