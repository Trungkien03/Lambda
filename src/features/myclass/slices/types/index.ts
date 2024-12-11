import Booking from "@app/stores/models/Booking.model";

type myClassViewState = {
  bookings: Booking[];
  isLoadingGetBooking: boolean;
};

const initialMyClassViewState: myClassViewState = {
  bookings: [],
  isLoadingGetBooking: false,
};

export { initialMyClassViewState };
export type { myClassViewState };
