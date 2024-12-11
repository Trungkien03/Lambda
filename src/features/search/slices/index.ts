import { createSlice } from "@reduxjs/toolkit";
import { initialSearchViewState } from "./types";

const searchViewSlice = createSlice({
  name: "search",
  initialState: initialSearchViewState,
  reducers: {
    setSearchClassResults: (state, action) => {
      state.searchResult.data = action.payload;
    },
    setSearchClassIsLoading: (state, action) => {
      state.searchResult.isLoadingSearch = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetSearchViewState: () => initialSearchViewState,
  },
});

export const {
  setSearchClassResults,
  setSearchClassIsLoading,
  setSearchQuery,
  resetSearchViewState,
} = searchViewSlice.actions;
export default searchViewSlice.reducer;
