import { createSlice } from "@reduxjs/toolkit";
import { initialAuthState } from "../types/auth.types";

const authSlice = createSlice({
  name: "dialog",
  initialState: initialAuthState,
  reducers: {
    reset: () => initialAuthState,
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
