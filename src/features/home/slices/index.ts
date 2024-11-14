import { createSlice } from "@reduxjs/toolkit";
import { initialHomeViewState } from "./types";

const homeViewSlice = createSlice({
  name: "home",
  initialState: initialHomeViewState,
  reducers: {
    setHomeViewClasses: (state, action) => {
      state.classes = action.payload;
    },
    setIsGetClassLoading: (state, action) => {
      state.isLoadingGetClass = action.payload;
    },
    setClassTypes: (state, action) => {
      state.classTypes = action.payload;
    },
    resetHomeViewState: () => initialHomeViewState,
  },
});

export const { setHomeViewClasses, setIsGetClassLoading, resetHomeViewState } =
  homeViewSlice.actions;
export default homeViewSlice.reducer;
