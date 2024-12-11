interface Booking {
  id: string;
  class_id: string;
  user_id: string;
  booking_date: string;
  booking_time: string;
  total_amount: number;
  payment_status: "Unpaid" | "Paid" | "Refund" | "Cancelled";
  status: "New" | "Pending" | "Confirmed" | "Cancelled";
}

export default Booking;
