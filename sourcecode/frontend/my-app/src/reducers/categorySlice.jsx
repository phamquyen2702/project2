import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    createCategory(state, action) {},
    updateCategory(state, action) {},
    deleteCategory(state, action) {},
  },
});

const { actions, reducers } = categorySlice;
export const { createCategory, updateCategory, deleteCategory } = actions;
export default reducers;
