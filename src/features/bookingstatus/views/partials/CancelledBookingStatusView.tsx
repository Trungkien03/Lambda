import TextView from "@app/components/UI/TextView";
import { useAppSelector } from "@app/stores";
import Booking from "@app/stores/models/Booking.model";
import { ThemeType } from "@app/themes";
import { Box, HStack, Spacer, useTheme, VStack } from "native-base";
import React from "react";
import BookingStatusItem from "../components/BookingStatusItem";

const CancelledBookingStatusView = () => {
  const theme = useTheme() as ThemeType;
  const { bookings } = useAppSelector((state) => state.bookingStatusView);

  const filteredBookings = bookings.filter(
    (booking) =>
      (booking.status === "Cancelled" || booking.status === "Confirmed") &&
      booking.payment_status === "Cancelled",
  );

  return (
    <VStack flex={1} padding={4} bg={theme.colors.background}>
      {/* Header Section */}
      <HStack alignItems="center" justifyContent="space-between" mb={4}>
        <TextView fontSize="xl" fontWeight="bold">
          Cancelled Bookings
        </TextView>
      </HStack>

      {/* Booking List */}
      {filteredBookings.length === 0 ? (
        <TextView fontSize="md" color="gray.500">
          No paid bookings found.
        </TextView>
      ) : (
        filteredBookings.map((booking: Booking, index) => (
          <HStack
            key={index}
            alignItems="center"
            bg="gray.100"
            borderRadius="md"
            mb={2}
          >
            <Box flex={1}>
              <BookingStatusItem booking={booking} />
            </Box>
          </HStack>
        ))
      )}

      <Spacer />
    </VStack>
  );
};

export default CancelledBookingStatusView;
