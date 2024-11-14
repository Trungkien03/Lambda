import TextView from "@app/components/UI/TextView";
import { ThemeType } from "@app/themes";
import helper from "@app/utils/helper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Icon, Image, useTheme, VStack } from "native-base";
import React from "react";

interface YogaClassCardProps {
  imageUri: string;
  title: string;
  date: string;
  time: string;
  capacity: number;
  price: number;
  description: string;
}

const YogaClassCard: React.FC<YogaClassCardProps> = ({
  imageUri,
  title,
  date,
  time,
  capacity,
  price,
  description,
}) => {
  const theme = useTheme() as ThemeType;
  return (
    <Box
      my={2}
      flex={1}
      bg={theme.colors.backgroundCourseCard}
      borderRadius={"2xl"}
    >
      <HStack space={2} alignItems="flex-start">
        <Image
          source={{ uri: imageUri }}
          alt={title}
          size="lg"
          borderRadius="2xl"
          height={120}
          width="35%"
        />

        {/* Nội dung lớp học */}
        <VStack flex={1} pr={2} space={1}>
          <TextView fontWeight="bold" fontSize="md">
            {title}
          </TextView>
          <TextView
            numberOfLines={1}
            color={theme.colors.gray[500]}
            fontSize="sm"
          >
            {description}
          </TextView>

          <HStack space={1} justifyContent={"space-between"}>
            <VStack space={2}>
              {/* Số lượng người tham gia */}
              <HStack alignItems="center" space={1}>
                <Icon
                  as={MaterialIcons}
                  name="groups"
                  size="sm"
                  color="blue.500"
                />
                <TextView color="gray.500" fontSize="sm">
                  Capacity: {capacity}
                </TextView>
              </HStack>

              {/* Giá của lớp học */}
              <HStack alignItems="center" space={1}>
                <TextView color="blue.500" fontSize="sm" fontWeight={"bold"}>
                  {helper.formatCurrencyVND(price)} VND
                </TextView>
              </HStack>
            </VStack>
            <VStack space={2}>
              {/* Thông tin ngày */}
              <HStack alignItems="center" space={1}>
                <Icon
                  as={Ionicons}
                  name="calendar"
                  size="sm"
                  color="green.500"
                />
                <TextView color="gray.500" fontSize="sm">
                  {date}
                </TextView>
              </HStack>

              {/* Thông tin giờ */}
              <HStack alignItems="center" space={1}>
                <Icon as={Ionicons} name="time" size="sm" color="green.500" />
                <TextView color="gray.500" fontSize="sm">
                  {time}
                </TextView>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default YogaClassCard;
