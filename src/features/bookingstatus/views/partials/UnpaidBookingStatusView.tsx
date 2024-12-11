import AppButton from "@app/components/atoms/AppButton";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppSelector } from "@app/stores";
import Booking from "@app/stores/models/Booking.model";
import { ThemeType } from "@app/themes";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Text,
  useTheme,
  VStack,
} from "native-base";
import React from "react";
import useUnpaidBookingStatusViewModel from "../../viewmodels/useUnpaidBookingStatusViewModel";
import BookingStatusItem from "../components/BookingStatusItem";

const UnpaidBookingStatusView = () => {
  const { bookings } = useAppSelector((state) => state.bookingStatusView);
  const { navigation } = useAppNavigation();
  const theme = useTheme() as ThemeType;

  const {
    handleCheckout,
    isSelectMode,
    selectedBookings,
    toggleBookingSelection,
    setIsSelectMode,
    setSelectedBookings,
  } = useUnpaidBookingStatusViewModel();

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.status === "New" && booking.payment_status === "Unpaid",
  );

  return (
    <VStack flex={1} padding={4} bg={theme.colors.background}>
      {/* Header Section */}
      <HStack alignItems="center" justifyContent="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Unpaid Bookings
        </Text>
        <IconButton
          icon={
            <Icon
              as={Ionicons}
              name={isSelectMode ? "close-circle" : "checkbox-outline"}
              size="md"
              color={theme.colors.primary[500]}
            />
          }
          onPress={() => {
            setIsSelectMode(!isSelectMode);
            if (!isSelectMode) {
              setSelectedBookings([]);
            }
          }}
        />
      </HStack>

      {/* Booking List */}
      {filteredBookings.length === 0 ? (
        <Text fontSize="md" color="gray.500">
          No unpaid bookings found.
        </Text>
      ) : (
        filteredBookings.map((booking: Booking, index) => (
          <HStack
            key={index}
            alignItems="center"
            bg="gray.100"
            borderRadius="md"
          >
            {/* Checkbox for selecting booking */}
            {isSelectMode && (
              <Checkbox
                isChecked={selectedBookings.some(
                  (item) => item.id === booking.id,
                )}
                onChange={() => toggleBookingSelection(booking)}
                value={booking.id}
                accessibilityLabel={`Select booking ${booking.id}`}
              />
            )}
            {/* Booking item */}
            <Box flex={1} marginLeft={isSelectMode ? 4 : 0}>
              <BookingStatusItem
                booking={booking}
                action={
                  isSelectMode
                    ? undefined
                    : () =>
                        navigation.navigate("payment", { bookings: [booking] })
                }
              />
            </Box>
          </HStack>
        ))
      )}

      <Spacer />
      {/* Checkout Button */}
      {isSelectMode && selectedBookings.length > 0 && (
        <AppButton
          title={`Checkout (${selectedBookings.length} items)`}
          onPress={handleCheckout}
        />
      )}
    </VStack>
  );
};

export default UnpaidBookingStatusView;
