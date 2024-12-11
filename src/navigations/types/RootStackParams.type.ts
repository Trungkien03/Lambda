import Booking from "@app/stores/models/Booking.model";
import Class from "@app/stores/models/Class.model";

type RootStackParams = {
  slash: undefined;
  main: undefined;
  login: undefined;
  yogaClassDetail: { class: Class };
  booking: { selectedClasses: Class[] };
  bookingStatus: undefined;
  categoryClass: undefined;
  payment: { bookings: Booking[] };
  paymentSuccess: undefined;
};

export type { RootStackParams };
