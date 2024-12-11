import { createSlice } from "@reduxjs/toolkit";
import { initialPaymentViewState } from "./types";

const paymentViewSlice = createSlice({
  name: "payment",
  initialState: initialPaymentViewState,
  reducers: {
    setIsOpenDialog: (state, action) => {
      state.isDialogOpen = action.payload;
    },
    setIsLoadingAddTransaction: (state, action) => {
      state.isLoadingAddTransaction = action.payload;
    },
    resetPaymentViewState: () => initialPaymentViewState,
  },
});

export const {
  setIsOpenDialog,
  setIsLoadingAddTransaction,
  resetPaymentViewState,
} = paymentViewSlice.actions;
export default paymentViewSlice.reducer;
