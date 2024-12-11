import Booking from "@app/stores/models/Booking.model";

type bookingStatusViewState = {
  bookings: Booking[];
  isLoadingGetBooking: boolean;
};

const initialBookingStatusViewState: bookingStatusViewState = {
  bookings: [],
  isLoadingGetBooking: false,
};

export { initialBookingStatusViewState };
export type { bookingStatusViewState };
