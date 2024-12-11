import TextView from "@app/components/UI/TextView";
import useClassesFirestore from "@app/hooks/firestores/useClassessFirestore";
import Booking from "@app/stores/models/Booking.model";
import Class from "@app/stores/models/Class.model";
import { ThemeType } from "@app/themes";
import helper from "@app/utils/helper";
import { Box, HStack, Image, useTheme, VStack } from "native-base";
import React, { useEffect, useState } from "react";

type PaymentCheckoutItemProps = {
  booking: Booking;
};

const PaymentCheckoutItem = ({ booking }: PaymentCheckoutItemProps) => {
  const [classDetail, setClassDetail] = useState<Class | null>(null);
  const { getClassById } = useClassesFirestore();
  const theme = useTheme() as ThemeType;

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

  return (
    <Box borderRadius="2xl" bg={theme.colors.backgroundCourseCard} p={4}>
      <HStack space={4}>
        {/* Class Image */}
        {classDetail?.image_url ? (
          <Image
            source={{ uri: classDetail.image_url }}
            alt={classDetail.title || "Class Image"}
            size="lg"
            borderRadius="md"
            bg="gray.200"
          />
        ) : (
          <Box size="lg" borderRadius="md" bg="gray.200" />
        )}

        {/* Class Details */}
        <VStack flex={1}>
          <TextView fontSize="md" fontWeight="bold" color="gray.800">
            {classDetail?.title || "Class Title"}
          </TextView>
          <TextView
            fontSize="xs"
            numberOfLines={3}
            color="gray.600"
            isTruncated
          >
            {classDetail?.description || "Class description not available."}
          </TextView>
          <TextView fontSize="xs" color="blue.500" fontWeight="bold">
            {classDetail?.duration
              ? `Duration: ${classDetail.duration} mins`
              : ""}
          </TextView>
        </VStack>
      </HStack>

      {/* Booking Details */}
      <VStack space={2} marginTop={4}>
        <HStack justifyContent={"space-between"}>
          <TextView fontSize="sm" color="gray.600" bold>
            Booking Date:
          </TextView>
          <TextView fontSize="sm" color="gray.600">
            {booking.booking_date}
          </TextView>
        </HStack>

        <HStack justifyContent={"space-between"}>
          <TextView fontSize="sm" color="gray.600" bold>
            Booking Time:
          </TextView>
          <TextView fontSize="sm" color="gray.600">
            {booking.booking_time}
          </TextView>
        </HStack>

        <HStack justifyContent={"space-between"}>
          <TextView fontSize="sm" color="gray.600" bold>
            Price:
          </TextView>
          <TextView fontSize="sm" color="blue.600" bold>
            {helper.formatCurrencyVND(booking.total_amount)} VND
          </TextView>
        </HStack>
      </VStack>
    </Box>
  );
};

export default PaymentCheckoutItem;
