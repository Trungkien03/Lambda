import AppButton from "@app/components/atoms/AppButton";
import { useAppDispatch, useAppSelector } from "@app/stores";
import React from "react";
import { LayoutAnimation } from "react-native";
import { setIsSelecting, setSelectedItem } from "../../slices";

const HeaderRightButton = () => {
  const { isSelecting } = useAppSelector((state) => state.cartView);
  const dispatch = useAppDispatch();

  return (
    <AppButton
      borderRadius={10}
      p={1}
      mr={2}
      title={isSelecting ? "Cancel" : "Select"}
      onPress={() => {
        if (!isSelecting) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          dispatch(setIsSelecting(true));
          setIsSelecting(true);
        } else {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsSelecting(false);
          dispatch(setIsSelecting(false));
          dispatch(setSelectedItem([]));
        }
      }}
    />
  );
};

export default HeaderRightButton;
