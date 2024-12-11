import { createSlice } from "@reduxjs/toolkit";
import { initialBookingStatusViewState } from "./types";

const bookingStatusViewSlice = createSlice({
  name: "bookingStatus",
  initialState: initialBookingStatusViewState,
  reducers: {
    setBookingList: (state, action) => {
      state.bookings = action.payload;
    },
    setIsLoadingGetBooking: (state, action) => {
      state.isLoadingGetBooking = action.payload;
    },
    resetBookingStatusViewState: () => {
      return initialBookingStatusViewState;
    },
  },
});

export const {
  setBookingList,
  setIsLoadingGetBooking,
  resetBookingStatusViewState,
} = bookingStatusViewSlice.actions;
export default bookingStatusViewSlice.reducer;
