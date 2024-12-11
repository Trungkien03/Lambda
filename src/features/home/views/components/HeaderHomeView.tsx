import TextView from "@app/components/UI/TextView";
import { useAppSelector } from "@app/stores";
import { Avatar, HStack, VStack } from "native-base";
import React from "react";

const HeaderHomeView = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <HStack alignItems="center" justifyContent="space-between" w="100%">
      <VStack>
        <TextView fontSize="lg" fontWeight="bold" color="black">
          Welcome, {user?.name}
        </TextView>
        <TextView fontSize="sm" color="gray.500">
          What you want to learn today?
        </TextView>
      </VStack>

      <HStack space={3} alignItems="center">
        <Avatar
          size="md"
          source={{
            uri: user?.profileImage || "https://via.placeholder.com/150",
          }}
          borderWidth={2}
          borderColor="green.500"
        />
      </HStack>
    </HStack>
  );
};

export default HeaderHomeView;
