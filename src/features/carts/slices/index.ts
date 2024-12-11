import { createSlice } from "@reduxjs/toolkit";
import { initialCartViewState } from "./types";

const cartViewSlice = createSlice({
  name: "cart",
  initialState: initialCartViewState,
  reducers: {
    setCartList: (state, action) => {
      state.classList = action.payload;
    },
    setIsLoadingGetClass: (state, action) => {
      state.isLoadingGetClass = action.payload;
    },
    setIisLoadingDeleteClass: (state, action) => {
      state.isLoadingDeleteClass = action.payload;
    },
    setIsSelecting: (state, action) => {
      state.isSelecting = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItems = action.payload;
    },
    resetCartViewState: () => {
      return initialCartViewState;
    },
  },
});

export const {
  setCartList,
  setIsLoadingGetClass,
  setIisLoadingDeleteClass,
  resetCartViewState,
  setIsSelecting,
  setSelectedItem,
} = cartViewSlice.actions;
export default cartViewSlice.reducer;
