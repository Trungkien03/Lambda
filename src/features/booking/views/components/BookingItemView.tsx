import TextView from "@app/components/UI/TextView";
import Class from "@app/stores/models/Class.model";
import { ThemeType } from "@app/themes";
import helper from "@app/utils/helper";
import { Box, Divider, HStack, Image, useTheme, VStack } from "native-base";
import React from "react";

const BookingItemView = ({ item }: { item: Class }) => {
  const theme = useTheme() as ThemeType;
  return (
    <Box p={2} my={2} bg={theme.colors.backgroundCourseCard} borderRadius="lg">
      <HStack space={4} alignItems="center">
        {/* Image */}
        <Image
          source={{ uri: item.image_url }}
          alt={item.title}
          width="24"
          height="24"
          borderRadius="md"
        />
        {/* Text Content */}
        <VStack flex={1} space={1}>
          <TextView
            fontSize="md"
            fontWeight="bold"
            color="gray.800"
            isTruncated
          >
            {item.title}
          </TextView>
          <TextView fontSize="sm" color="gray.500" isTruncated>
            {item.description}
          </TextView>
          <HStack space={2} alignItems="center">
            <TextView fontSize="xs" color="gray.500">
              {item.date}
            </TextView>
            <Divider orientation="horizontal" w={2} />
            <TextView fontSize="xs" color="gray.500">
              {helper.getDayOfWeek(item.date)}
            </TextView>
            <Divider orientation="horizontal" w={2} />
            <TextView fontSize="xs" color="gray.500">
              {item.time}
            </TextView>
          </HStack>
          {/* Price */}
          <TextView fontSize="md" fontWeight="bold" color="blue.500">
            {helper.formatCurrencyVND(item.price)} VND
          </TextView>
        </VStack>
      </HStack>
    </Box>
  );
};

export default BookingItemView;
