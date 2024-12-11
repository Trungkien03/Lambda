import AppButton from "@app/components/atoms/AppButton";
import TextView from "@app/components/UI/TextView";
import useClassesFirestore from "@app/hooks/firestores/useClassessFirestore";
import Booking from "@app/stores/models/Booking.model";
import Class from "@app/stores/models/Class.model";
import { ThemeType } from "@app/themes";
import {
  Badge,
  Box,
  Divider,
  HStack,
  Image,
  useTheme,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";

type BookingStatusItemProps = {
  booking: Booking;
  action?: () => void;
};

const BookingStatusItem = ({ booking, action }: BookingStatusItemProps) => {
  const theme = useTheme() as ThemeType;

  const [classDetail, setClassDetail] = useState<Class | null>(null);
  const { getClassById } = useClassesFirestore();

  useEffect(() => {
    const handleFetchingClass = async () => {
      try {
        const fetchedClass = await getClassById(booking.class_id);
        if (fetchedClass) {
          setClassDetail(fetchedClass);
        } else {
          console.warn("Class not found");
        }
      } catch (error) {
        console.error("Error fetching class detail:", error);
      }
    };

    handleFetchingClass();
  }, []);

  let buttonText = "";
  let isDisabled = false;

  if (booking.payment_status === "Unpaid" && booking.status === "New") {
    buttonText = "Confirm Payment";
  } else if (
    booking.payment_status === "Paid" &&
    booking.status === "Pending"
  ) {
    buttonText = "Pending";
    isDisabled = true; // Disable button for pending status
  } else if (
    booking.payment_status === "Paid" &&
    booking.status === "Confirmed"
  ) {
    buttonText = "Refund";
  }

  return (
    <Box
      key={booking.id}
      padding={4}
      borderRadius="xl"
      bg={theme.colors.backgroundCourseCard}
      mb={2}
    >
      {/* Booking Header */}
      <HStack space={4}>
        {/* Image */}
        <Image
          source={{ uri: classDetail?.image_url }}
          alt={classDetail?.title || "Class Image"}
          width="90px"
          height="90px"
          borderRadius="md"
          bg="gray.200"
        />
        {/* Text Content */}
        <VStack flex={1}>
          <TextView fontSize="lg" fontWeight="bold" color="gray.800">
            {classDetail?.title || "Loading..."}
          </TextView>
          <TextView fontSize="sm" color="gray.600" numberOfLines={3}>
            {classDetail?.description || "Description not available"}
          </TextView>
        </VStack>
      </HStack>

      {/* Divider */}
      <Divider my={4} />

      {/* Booking Details */}
      <VStack space={3}>
        <HStack justifyContent="space-between" alignItems="center">
          <TextView fontSize="sm" fontWeight="bold" color="gray.800">
            Booking Date
          </TextView>
          <TextView fontSize="sm" color="gray.600">
            {booking.booking_date}
          </TextView>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <TextView fontSize="sm" fontWeight="bold" color="gray.800">
            Booking Time
          </TextView>
          <TextView fontSize="sm" color="gray.600">
            {booking.booking_time}
          </TextView>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <TextView fontSize="sm" fontWeight="bold" color="gray.800">
            Total Amount
          </TextView>
          <TextView fontSize="sm" color="blue.600" bold>
            {booking.total_amount.toLocaleString()} VND
          </TextView>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <TextView fontSize="sm" fontWeight="bold" color="gray.800">
            Status
          </TextView>
          <Badge
            colorScheme={
              booking.payment_status === "Unpaid"
                ? "red"
                : booking.payment_status === "Paid"
                  ? "green"
                  : "gray"
            }
            fontSize="sm"
          >
            {booking.payment_status}
          </Badge>
        </HStack>
      </VStack>

      {/* Divider */}
      <Divider my={4} />

      {/* Action Button */}
      {action && buttonText ? (
        <AppButton
          borderRadius={10}
          title={buttonText}
          onPress={action}
          isDisabled={isDisabled}
        />
      ) : buttonText ? (
        <TextView fontSize="sm" color="gray.500">
          {buttonText}
        </TextView>
      ) : null}
    </Box>
  );
};

export default BookingStatusItem;
