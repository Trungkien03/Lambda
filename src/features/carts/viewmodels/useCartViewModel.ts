import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppDispatch, useAppSelector } from "@app/stores";
import { hideDialog, showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import Database from "@app/utils/database";
import { useEffect } from "react";
import { LayoutAnimation } from "react-native";
import {
  setCartList,
  setIisLoadingDeleteClass,
  setIsLoadingGetClass,
  setIsSelecting,
  setSelectedItem,
} from "../slices";

const useCartViewModel = () => {
  const dispatch = useAppDispatch();
  const { classList, selectedItems } = useAppSelector(
    (state) => state.cartView,
  );
  const db = Database.getInstance();
  const { navigation } = useAppNavigation();

  const fetchCartItems = async () => {
    dispatch(setIsLoadingGetClass(true));
    try {
      const items = await db.getCart();
      dispatch(setCartList(items));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      dispatch(setIsLoadingGetClass(false));
    }
  };

  const handleRemoveItem = async (classId: string) => {
    dispatch(setIisLoadingDeleteClass(true));
    try {
      await db.deleteFromCart(classId);
      const filteredItems = classList.filter((item) => item.id !== classId);
      dispatch(setCartList(filteredItems));
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      dispatch(setIisLoadingDeleteClass(false));
    }
  };

  const handleAskRemoveItem = (classId: string) => {
    dispatch(
      showDialog({
        title: "Confirm",
        content: "Are you sure want to remove this item from cart ?",
        type: DialogType.ALERT,
        onCancel() {
          dispatch(hideDialog());
        },
        onConfirm() {
          dispatch(hideDialog());
          handleRemoveItem(classId);
        },
      }),
    );
  };

  // Handle item selection
  const handleSelectItem = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedItems.includes(id)) {
      dispatch(
        setSelectedItem(selectedItems.filter((itemId) => itemId !== id)),
      );
    } else {
      dispatch(setSelectedItem([...selectedItems, id]));
    }
  };

  const handleBookNow = () => {
    const selectedClasses = classList.filter((item) =>
      selectedItems.includes(item.id),
    );

    db.deleteMultipleFromCart(selectedItems)
      .then(() => {
        console.log("Selected items removed from the cart successfully.");

        // Update the cart list in the Redux state
        const updatedClassList = classList.filter(
          (item) => !selectedItems.includes(item.id),
        );
        dispatch(setCartList(updatedClassList));

        // Navigate to the booking screen with the selected classes
        navigation.navigate("booking", { selectedClasses });

        // Reset the selection state
        dispatch(setIsSelecting(false));
        dispatch(setSelectedItem([]));
      })
      .catch((err) => {
        console.error("Error removing items from the cart:", err);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);
  return {
    handleAskRemoveItem,
    fetchCartItems,
    handleSelectItem,
    handleBookNow,
  };
};

export default useCartViewModel;
