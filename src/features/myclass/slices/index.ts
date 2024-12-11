import Booking from "@app/stores/models/Booking.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialMyClassViewState } from "./types";

const myClassViewSlice = createSlice({
  name: "myClass",
  initialState: initialMyClassViewState,
  reducers: {
    setBookingMyClassList: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    setIsLoadingGetBooking: (state, action) => {
      state.isLoadingGetBooking = action.payload;
    },
    resetPaymentViewState: () => initialMyClassViewState,
  },
});

export const {
  setBookingMyClassList,
  setIsLoadingGetBooking,
  resetPaymentViewState,
} = myClassViewSlice.actions;
export default myClassViewSlice.reducer;
