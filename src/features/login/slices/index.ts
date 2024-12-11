import { createSlice } from "@reduxjs/toolkit";
import { initialLoginViewState } from "./types";

const loginViewSlice = createSlice({
  name: "login",
  initialState: initialLoginViewState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsLoginLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetLoginState: () => initialLoginViewState,
  },
});

export const { resetLoginState, setEmail, setPassword, setIsLoginLoading } =
  loginViewSlice.actions;
export default loginViewSlice.reducer;
