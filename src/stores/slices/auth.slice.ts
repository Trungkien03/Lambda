import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../models/User.model";
import { initialAuthState } from "../types/auth.types";

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsShowingSlashScreen: (state, action) => {
      state.isShowingSlashScreen = action.payload;
    },
    reset: () => initialAuthState,
  },
});

export const { reset, setUser, setIsShowingSlashScreen } = authSlice.actions;
export default authSlice.reducer;
