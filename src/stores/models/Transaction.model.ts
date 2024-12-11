interface Transaction {
  id: string;
  user_id: string;
  bookings: string[];
  amount: number;
  payment_method: "Credit Card" | "Bank Transfer";
  status: "Pending" | "Completed" | "Failed" | "Refunded";
  transaction_message: string;
  created_at: string;
  updated_at?: string;
}

export default Transaction;
