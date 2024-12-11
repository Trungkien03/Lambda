import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppDispatch } from "@app/stores";
import Booking from "@app/stores/models/Booking.model";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { useState } from "react";

const useUnpaidBookingStatusViewModel = () => {
  const { navigation } = useAppNavigation();
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // Function to handle selecting or deselecting a booking
  const toggleBookingSelection = (booking: Booking) => {
    if (selectedBookings.find((item) => item.id === booking.id)) {
      setSelectedBookings(
        selectedBookings.filter((item) => item.id !== booking.id),
      );
    } else {
      setSelectedBookings([...selectedBookings, booking]);
    }
  };

  // Function to handle navigating to the payment screen
  const handleCheckout = () => {
    if (selectedBookings.length > 0) {
      navigation.navigate("payment", { bookings: selectedBookings });
    } else {
      dispatch(
        showDialog({
          title: "Alert",
          content: "Please Select Item to checkout !",
          type: DialogType.ALERT,
        }),
      );
    }
  };

  return {
    isSelectMode,
    setIsSelectMode,
    selectedBookings,
    setSelectedBookings,
    toggleBookingSelection,
    handleCheckout,
  };
};

export default useUnpaidBookingStatusViewModel;
