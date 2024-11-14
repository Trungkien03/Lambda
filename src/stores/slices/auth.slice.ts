import { createSlice } from "@reduxjs/toolkit";
import { initialAuthState } from "../types/auth.types";

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    reset: () => initialAuthState,
  },
});

export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
