import AppButton from "@app/components/atoms/AppButton";
import BackButton from "@app/components/atoms/BackButton";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { ThemeType } from "@app/themes";
import helper from "@app/utils/helper";
import { Divider, HStack, Text, useTheme, VStack } from "native-base";
import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native";
import useBookingViewModel from "../viewmodels/useBookingViewModel";
import BookingItemView from "./components/BookingItemView";

const BookingView = () => {
  const { navigation } = useAppNavigation();

  const theme = useTheme() as ThemeType;
  const { handleAskConfirmBooking, selectedClasses } = useBookingViewModel();

  const totalAmount = selectedClasses.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Booking",
      headerTitleAlign: "center",
      headerLeft: () => <BackButton />,
    });
  }, []);

  return (
    <VStack flex={1} bg={theme.colors.background} padding={4}>
      <FlatList
        data={selectedClasses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookingItemView item={item} />}
      />
      <VStack mt={4} space={2}>
        <Divider my={2} />
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            Total:
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="blue.500">
            {helper.formatCurrencyVND(totalAmount)} VND
          </Text>
        </HStack>
        <AppButton
          title="Confirm Booking"
          onPress={handleAskConfirmBooking}
          borderRadius={10}
        />
      </VStack>
    </VStack>
  );
};

export default BookingView;
