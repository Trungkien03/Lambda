import useAppNavigation from "@app/hooks/useAppNavigation";
import useGoogleSignIn from "@app/hooks/useGoogleSignIn";
import { useAppDispatch } from "@app/stores";
import { setUser } from "@app/stores/slices/auth.slice";
import { hideDialog, showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { useEffect } from "react";
import MenuItem from "../models/Menu.model";

const useProfileViewModel = () => {
  const dispatch = useAppDispatch();
  const { navigation } = useAppNavigation();
  const { signOut, configureGoogleSignIn } = useGoogleSignIn();

  // Example menu items
  const menuItems: MenuItem[] = [
    {
      icon: "book",
      label: "Booking Status",
      action: () => navigation.navigate("bookingStatus"),
    },
  ];

  const handleSignOutConfirm = async () => {
    dispatch(hideDialog());
    await signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
    dispatch(setUser(null));
  };

  const handleSignOut = () => {
    dispatch(
      showDialog({
        title: "Confirm",
        content: "Are you sure want to sign out ?",
        type: DialogType.ALERT,
        onCancel() {
          dispatch(hideDialog());
        },
        onConfirm() {
          handleSignOutConfirm();
        },
      }),
    );
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return { menuItems, handleSignOut };
};

export default useProfileViewModel;
