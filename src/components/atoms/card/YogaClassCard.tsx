import TextView from "@app/components/UI/TextView";
import { ThemeType } from "@app/themes";
import helper from "@app/utils/helper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Icon,
  Image,
  Spacer,
  useTheme,
  VStack,
} from "native-base";
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
          height={140}
          width="40%"
        />

        <VStack flex={1} pr={2} space={1} p={1}>
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

          <TextView color="gray.500" fontSize="sm">
            {helper.formatDateToVN(date)}
          </TextView>

          <HStack space={1}>
            <VStack space={2}>
              <HStack alignItems="center" space={1}>
                <Icon
                  as={MaterialIcons}
                  name="groups"
                  size="sm"
                  color="blue.500"
                />
                <TextView color="gray.500" fontSize="sm">
                  ({capacity})
                </TextView>
              </HStack>

              <HStack alignItems="center" space={1}>
                <TextView color="blue.500" fontSize="sm" fontWeight={"bold"}>
                  {helper.formatCurrencyVND(price)} VND
                </TextView>
              </HStack>
            </VStack>
            <Spacer />
            <VStack space={2}>
              <HStack alignItems="center" space={1}>
                <Icon
                  as={Ionicons}
                  name="calendar"
                  size="sm"
                  color="green.500"
                />
                <TextView color="gray.500" fontSize="sm">
                  {helper.getDayOfWeek(date)}
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
            <Spacer />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default YogaClassCard;
