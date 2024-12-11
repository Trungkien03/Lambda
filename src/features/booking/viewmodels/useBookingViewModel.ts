import useBookingsFirestore from "@app/hooks/firestores/useBookingsFirestore";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { useAppDispatch, useAppSelector } from "@app/stores";
import Booking from "@app/stores/models/Booking.model";
import { hideDialog, showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import Database from "@app/utils/database";
import { RouteProp, useRoute } from "@react-navigation/native";

const useBookingViewModel = () => {
  const route = useRoute<RouteProp<RootStackParams, "booking">>();
  const { selectedClasses } = route.params;
  const dispatch = useAppDispatch();
  const { addBooking } = useBookingsFirestore();
  const db = Database.getInstance();
  const { navigation } = useAppNavigation();
  const { user } = useAppSelector((state) => state.auth);

  const handleConfirmBooking = async () => {
    try {
      if (!user?.id) {
        navigation.reset({
          index: 0,
          routes: [{ name: "login" }],
        });
        return;
      }
      for (const selectedClass of selectedClasses) {
        const newBooking: Booking = {
          id: new Date().toISOString().replace(/[-:.TZ]/g, ""),
          class_id: selectedClass.id,
          user_id: user.id,
          booking_date: new Date().toISOString().split("T")[0],
          booking_time: new Date().toISOString().split("T")[1].split(".")[0],
          total_amount: selectedClass.price,
          payment_status: "Unpaid",
          status: "New",
        };

        await addBooking(newBooking);
        await db.deleteFromCart(selectedClass.id);
      }

      dispatch(
        showDialog({
          title: "Success",
          content: "Your booking has been successfully created!",
          type: DialogType.SUCCESS,
        }),
      );

      navigation.reset({
        index: 1,
        routes: [{ name: "main" }, { name: "bookingStatus" }],
      });
    } catch (error) {
      console.error("Error during booking process:", error);
      dispatch(
        showDialog({
          title: "Error",
          content: "Failed to create booking. Please try again.",
          type: DialogType.ALERT,
          onCancel() {
            dispatch(hideDialog());
          },
        }),
      );
    }
  };

  const handleAskConfirmBooking = () => {
    dispatch(
      showDialog({
        title: "Confirm",
        content: "Are you sure want to book this class?",
        type: DialogType.ALERT,
        onCancel() {
          dispatch(hideDialog());
        },
        onConfirm() {
          dispatch(hideDialog());
          handleConfirmBooking();
        },
      }),
    );
  };

  return { handleAskConfirmBooking, selectedClasses };
};

export default useBookingViewModel;
