import { createSlice } from "@reduxjs/toolkit";
import { initialBookingViewState } from "./types";

const bookingViewSlice = createSlice({
  name: "bookings",
  initialState: initialBookingViewState,
  reducers: {
    setIsLoadingAddBooking: (state, action) => {
      state.isLoadingAddBooking = action.payload;
    },
    resetBookingViewState: () => {
      return initialBookingViewState;
    },
  },
});

export const { setIsLoadingAddBooking, resetBookingViewState } =
  bookingViewSlice.actions;
export default bookingViewSlice.reducer;
