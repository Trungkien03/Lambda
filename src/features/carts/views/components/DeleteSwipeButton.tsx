import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, IconButton } from "native-base";
import React from "react";

type DeleteSwipeButtonProps = {
  handleAskRemoveItem: () => void;
};

const DeleteSwipeButton = ({ handleAskRemoveItem }: DeleteSwipeButtonProps) => {
  return (
    <HStack flex={1} justifyContent="flex-end" alignItems="center">
      <IconButton
        icon={<Icon as={Ionicons} name="trash" color="white" />}
        bg="red.500"
        size="lg"
        onPress={() => {
          handleAskRemoveItem();
        }}
      />
    </HStack>
  );
};

export default DeleteSwipeButton;
