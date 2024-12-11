import { setCartList } from "@app/features/carts/slices";
import useBookingsFirestore from "@app/hooks/firestores/useBookingsFirestore";
import useClassesTypeFirestore from "@app/hooks/firestores/useClassesTypeFirestore";
import useClassInstancesFirestore from "@app/hooks/firestores/useClassInstancesFirestore";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { useAppDispatch, useAppSelector } from "@app/stores";
import { hideDialog, showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import Database from "@app/utils/database";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  setClassType,
  setClassTypeIsLoading,
  setInstances,
  setInstancesIsLoading,
  setIsBookedClass,
  setIsLoadingCheckBookedClass,
} from "../slices";

const useYogaClassDetailViewModel = () => {
  const route = useRoute<RouteProp<RootStackParams, "yogaClassDetail">>();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoadingAddToCard, setIsLoadingAddToCart] = useState(false);
  const { class: classDetail } = route.params;
  const dispatch = useAppDispatch();
  const { classList } = useAppSelector((state) => state.cartView);
  const { navigation } = useAppNavigation();
  const db = Database.getInstance();
  const { fetchInstancesByClassId } = useClassInstancesFirestore();
  const { fetchClassTypeById } = useClassesTypeFirestore();
  const { getBookingByClassIdAndUserId } = useBookingsFirestore();

  const handleFetchingInstances = async () => {
    dispatch(setInstancesIsLoading(true));
    const response = await fetchInstancesByClassId(classDetail.id);
    dispatch(setInstances(response));
    dispatch(setInstancesIsLoading(false));
  };

  const handleFetchingClassType = async () => {
    dispatch(setClassTypeIsLoading(true));
    const response = await fetchClassTypeById(classDetail.class_type_id);
    dispatch(setClassType(response));
    dispatch(setClassTypeIsLoading(false));
  };

  const handleAddToCart = async () => {
    setIsLoadingAddToCart(true);
    try {
      const response = await db.addToCart(classDetail);

      dispatch(setCartList([...classList, classDetail]));
      if (response) {
        dispatch(
          showDialog({
            title: "Success",
            content: "Added to cart successfully",
            type: DialogType.SUCCESS,
          }),
        );
      }
    } catch (error) {
      dispatch(
        showDialog({
          title: "Error",
          content: "Failed to add to cart. Please try again.",
          type: DialogType.ERROR,
        }),
      );
    } finally {
      setIsLoadingAddToCart(false);
    }
    console.log("Added to cart:", classDetail.id);
  };

  const handleAskAddToCart = () => {
    dispatch(
      showDialog({
        title: "Confirm",
        content: "Are you sure want to add this item to cart ?",
        type: DialogType.ALERT,
        onConfirm() {
          dispatch(hideDialog());
          handleAddToCart();
        },
        onCancel() {
          dispatch(hideDialog());
        },
      }),
    );
  };

  const handleBooking = () => {
    dispatch(
      showDialog({
        title: "Confirm",
        content: "Are you sure want to book this class ?",
        type: DialogType.ALERT,
        onConfirm() {
          dispatch(hideDialog());
          db.deleteFromCart(classDetail.id);
          dispatch(
            setCartList(classList.filter((item) => item.id !== classDetail.id)),
          );
          navigation.navigate("booking", { selectedClasses: [classDetail] });
        },
        onCancel() {
          dispatch(hideDialog());
        },
      }),
    );
  };

  const handleCheckingIsBookedClass = async () => {
    dispatch(setIsLoadingCheckBookedClass(true));
    if (!user?.id) {
      dispatch(
        showDialog({
          title: "Error",
          content: "User not found, please login again !",
          type: DialogType.ERROR,
          onCancel() {
            dispatch(hideDialog());
            navigation.reset({
              index: 0,
              routes: [{ name: "login" }],
            });
          },
          onConfirm() {
            dispatch(hideDialog());
            navigation.reset({
              index: 0,
              routes: [{ name: "login" }],
            });
          },
        }),
      );
      return;
    }
    try {
      const response = await getBookingByClassIdAndUserId(
        classDetail.id,
        user.id,
      );
      if (response) {
        dispatch(setIsBookedClass(true));
      } else {
        dispatch(setIsBookedClass(false));
      }
    } catch (error: any) {
      dispatch(
        showDialog({
          title: "Error",
          content: error.message,
          type: DialogType.ERROR,
        }),
      );
    } finally {
      dispatch(setIsLoadingCheckBookedClass(false));
    }
  };

  useEffect(() => {
    handleFetchingInstances();
    handleFetchingClassType();
    handleCheckingIsBookedClass();
  }, []);

  return {
    classDetail,
    handleAskAddToCart,
    handleBooking,
    isLoadingAddToCard,
  };
};

export default useYogaClassDetailViewModel;
