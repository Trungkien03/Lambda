import useBookingsFirestore from "@app/hooks/firestores/useBookingsFirestore";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppDispatch, useAppSelector } from "@app/stores";
import { hideDialog, showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { setBookingList, setIsLoadingGetBooking } from "../slices";
import { useEffect } from "react";

const useBookingStatusViewModel = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { getBookingsByUser } = useBookingsFirestore();
  const dispatch = useAppDispatch();
  const { navigation } = useAppNavigation();

  const handleErrorUser = () => {
    dispatch(hideDialog());
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  const fetchingBookings = async () => {
    try {
      dispatch(setIsLoadingGetBooking(true));

      if (!user?.id) {
        dispatch(
          showDialog({
            title: "Error",
            content: "User not found, please login again !",
            type: DialogType.ERROR,
            onCancel() {
              handleErrorUser();
            },
            onConfirm() {
              handleErrorUser();
            },
          }),
        );

        return;
      }
      const response = await getBookingsByUser(user.id);
      dispatch(setBookingList(response));
    } catch (error: any) {
      dispatch(
        showDialog({
          title: "Error",
          content: error.message,
          type: DialogType.ERROR,
        }),
      );
    } finally {
      dispatch(setIsLoadingGetBooking(false));
    }
  };

  useEffect(() => {
    fetchingBookings();
  }, []);

  return;
};

export default useBookingStatusViewModel;
