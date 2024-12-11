import Booking from "@app/stores/models/Booking.model";
import firestore from "@react-native-firebase/firestore";

const BOOKINGS_COLLECTION = "bookings";

const useBookingsFirestore = () => {
  /**
   * Get all bookings belonging to the current user
   * @param userId The ID of the current user
   * @returns A promise resolving to an array of bookings
   */
  const getBookingsByUser = async (userId: string): Promise<Booking[]> => {
    try {
      const snapshot = await firestore()
        .collection(BOOKINGS_COLLECTION)
        .where("user_id", "==", userId)
        .get();

      const bookings: Booking[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Booking[];

      return bookings;
    } catch (error) {
      console.error("Error fetching bookings for user:", error);
      throw error;
    }
  };

  /**
   * Add a new booking to Firestore
   * @param booking The booking object to be added
   * @returns A promise resolving to the added booking document ID
   */
  const addBooking = async (booking: Booking): Promise<string> => {
    try {
      if (!booking.id) {
        throw new Error("Booking ID is required.");
      }

      const bookingRef = firestore()
        .collection(BOOKINGS_COLLECTION)
        .doc(booking.id);

      await bookingRef.set(booking);

      console.log("Booking added with ID:", booking.id);
      return booking.id;
    } catch (error) {
      console.error("Error adding booking:", error);
      throw error;
    }
  };
  /**
   * Find a booking in Firestore by classId and userId
   * @param classId The ID of the class
   * @param userId The ID of the user
   * @returns A promise resolving to the Booking object or null if not found
   */
  const getBookingByClassIdAndUserId = async (
    classId: string,
    userId: string,
  ): Promise<Booking | null> => {
    try {
      const snapshot = await firestore()
        .collection(BOOKINGS_COLLECTION)
        .where("class_id", "==", classId)
        .where("user_id", "==", userId)
        .limit(1) // Ensure only one result is fetched
        .get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
        } as Booking;
      } else {
        console.log(
          `No booking found for classId: ${classId} and userId: ${userId}`,
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
  };

  /**
   * Update the status of a booking
   * @param bookingId The ID of the booking to update
   * @param status The new status to set
   * @param paymentStatus Optional: The new payment status to set
   * @returns A promise that resolves when the update is complete
   */
  const updateBookingStatus = async (
    bookingId: string,
    status: "New" | "Pending" | "Confirmed" | "Cancelled",
    paymentStatus?: "Unpaid" | "Paid" | "Refund" | "Cancelled",
  ): Promise<void> => {
    try {
      const snapshot = await firestore()
        .collection(BOOKINGS_COLLECTION)
        .where("id", "==", bookingId)
        .get();

      if (snapshot.empty) {
        throw new Error(`Booking with ID ${bookingId} not found.`);
      }

      const updateData: Partial<Booking> = { status };
      if (paymentStatus) {
        updateData.payment_status = paymentStatus;
      }

      const batch = firestore().batch(); // Use batch for consistency
      snapshot.docs.forEach((doc) => {
        batch.update(doc.ref, updateData);
      });

      await batch.commit();

      console.log(`Booking ${bookingId} updated successfully.`);
    } catch (error) {
      console.error(`Error updating booking ${bookingId}:`, error);
      throw error;
    }
  };

  return {
    getBookingsByUser,
    addBooking,
    getBookingByClassIdAndUserId,
    updateBookingStatus,
  };
};

export default useBookingsFirestore;
