import useBookingsFirestore from "@app/hooks/firestores/useBookingsFirestore";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppDispatch, useAppSelector } from "@app/stores";
import { hideDialog, showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { useEffect } from "react";
import { setBookingMyClassList, setIsLoadingGetBooking } from "../slices";

const useMyClassViewModel = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { navigation } = useAppNavigation();
  const { getBookingsByUser } = useBookingsFirestore();

  const handleFetchingGetBooking = async () => {
    try {
      dispatch(setIsLoadingGetBooking(true));
      if (!user?.id) {
        dispatch(
          showDialog({
            title: "Error",
            content: "User not found, please login again !",
            type: DialogType.ERROR,
            onConfirm() {
              navigation.reset({
                index: 0,
                routes: [{ name: "login" }],
              });
              dispatch(hideDialog());
            },
            onCancel() {
              navigation.reset({
                index: 0,
                routes: [{ name: "login" }],
              });
              dispatch(hideDialog());
            },
          }),
        );
        return;
      }
      const response = await getBookingsByUser(user.id);

      dispatch(setBookingMyClassList(response));
    } catch {
      dispatch(
        showDialog({
          title: "Error",
          content: "Cannot Fetching Booking !",
          type: DialogType.ERROR,
        }),
      );
    } finally {
      dispatch(setIsLoadingGetBooking(false));
    }
  };

  useEffect(() => {
    handleFetchingGetBooking();
  }, []);

  return { handleFetchingGetBooking };
};

export default useMyClassViewModel;
