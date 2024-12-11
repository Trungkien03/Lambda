import TextView from "@app/components/UI/TextView";
import useClassesFirestore from "@app/hooks/firestores/useClassessFirestore";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppDispatch } from "@app/stores";
import Booking from "@app/stores/models/Booking.model";
import Class from "@app/stores/models/Class.model";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { ThemeType } from "@app/themes";
import helper from "@app/utils/helper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Badge,
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  Spacer,
  useTheme,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

type BookingStatusItemProps = {
  booking: Booking;
  action?: () => void;
};

const MyClassViewItem = ({ booking, action }: BookingStatusItemProps) => {
  const theme = useTheme() as ThemeType;
  const { navigation } = useAppNavigation();
  const dispatch = useAppDispatch();

  const [classDetail, setClassDetail] = useState<Class | null>(null);
  const { getClassById } = useClassesFirestore();

  if (!action) {
    action = () => {
      if (!classDetail) {
        dispatch(
          showDialog({
            title: "Error",
            content: "Class not found !",
            type: DialogType.ERROR,
          }),
        );
        return;
      }
      navigation.navigate("yogaClassDetail", { class: classDetail });
    };
  }

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
    <TouchableOpacity onPress={action}>
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
            width="35%"
            height="120px"
            resizeMode="cover"
            borderRadius="md"
            bg="gray.200"
          />
          {/* Text Content */}

          <VStack flex={1}>
            <TextView fontWeight="bold" fontSize="md">
              {classDetail?.title || "Loading..."}
            </TextView>
            <TextView
              numberOfLines={2}
              color={theme.colors.gray[500]}
              fontSize="sm"
            >
              {classDetail?.description || "Description not available"}
            </TextView>

            <HStack space={10}>
              <VStack space={2}>
                <HStack alignItems="center" space={1}>
                  <Icon
                    as={Ionicons}
                    name="calendar"
                    size="sm"
                    color="green.500"
                  />
                  <TextView color="gray.500" fontSize="sm">
                    {helper.getDayOfWeek(classDetail?.date ?? "")}
                  </TextView>
                </HStack>

                {/* Thông tin giờ */}
                <HStack alignItems="center" space={1}>
                  <Icon as={Ionicons} name="time" size="sm" color="green.500" />
                  <TextView color="gray.500" fontSize="sm">
                    {classDetail?.time ?? ""}
                  </TextView>
                </HStack>
              </VStack>
              <VStack space={2}>
                <HStack alignItems="center" space={1}>
                  <Icon
                    as={MaterialIcons}
                    name="groups"
                    size="sm"
                    color="blue.500"
                  />
                  <TextView color="gray.500" fontSize="sm">
                    ({classDetail?.capacity ?? 0})
                  </TextView>
                </HStack>
              </VStack>
              <Spacer />

              <Spacer />
            </HStack>
          </VStack>
        </HStack>

        {/* Divider */}
        <Divider my={4} />

        {/* Booking Details */}
        <VStack space={3}>
          <HStack justifyContent="space-between" alignItems="center">
            <TextView fontSize="sm" fontWeight="bold" color="gray.800">
              Payment Status
            </TextView>
            <Badge
              _text={{ color: "white" }}
              colorScheme="gray"
              fontSize="sm"
              bg={theme.colors.green[600]}
              borderRadius={5}
            >
              {booking.payment_status}
            </Badge>
          </HStack>
        </VStack>

        {/* Divider */}
        <Divider my={4} />

        {/* Booking Details */}
        <VStack space={3}>
          <HStack justifyContent="space-between" alignItems="center">
            <TextView fontSize="sm" fontWeight="bold" color="gray.800">
              Status
            </TextView>

            <Badge
              _text={{ color: "white" }}
              colorScheme="gray"
              fontSize="sm"
              bg={theme.colors.green[600]}
              borderRadius={5}
            >
              {booking.status}
            </Badge>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default MyClassViewItem;
