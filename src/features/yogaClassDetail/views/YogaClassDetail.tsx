import AppButton from "@app/components/atoms/AppButton";
import BackButton from "@app/components/atoms/BackButton";
import LoadingIndicator from "@app/components/UI/LoadingIndicator";
import TextView from "@app/components/UI/TextView";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppSelector } from "@app/stores";
import { ThemeType } from "@app/themes";
import helper from "@app/utils/helper";
import { Ionicons } from "@expo/vector-icons";
import {
  Badge,
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Spinner,
  Text,
  useTheme,
  VStack,
} from "native-base";
import React, { useLayoutEffect } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import useYogaClassDetailViewModel from "../viewmodels/useYogaClassDetailViewModel";
import InstanceItem from "./components/InstanceItem";

const YogaClassDetail = () => {
  const theme = useTheme() as ThemeType;
  const { navigation } = useAppNavigation();
  const { classDetail, handleAskAddToCart, handleBooking, isLoadingAddToCard } =
    useYogaClassDetailViewModel();

  const {
    instances: { data: classInstances },
    classType: { data: classType },
    isBookedClass,
    isLoadingCheckBookedClass,
  } = useAppSelector((state) => state.yogaClassDetailView);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Yoga Class Detail",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerLeft: () => <BackButton />,
    });
  }, []);

  return (
    <>
      {isLoadingAddToCard && <LoadingIndicator />}
      <ScrollView>
        <Image
          source={{ uri: classDetail.image_url }}
          style={{
            width: "100%",
            height: 250,
          }}
          resizeMode="cover"
        />

        <VStack padding={4} space={4}>
          <TextView fontSize="2xl" fontWeight="bold" color="black">
            {classDetail.title}
          </TextView>

          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space={2}>
              <Icon as={Ionicons} name="people" size="md" color="blue.500" />
              <TextView fontSize="md" color="gray.600">
                {classDetail.capacity} Capacity
              </TextView>
            </HStack>
            <Badge colorScheme="green" variant="solid" rounded="md">
              <TextView color={"white"} bold>
                {classType?.name}
              </TextView>
            </Badge>
          </HStack>

          <TextView fontSize="xl" fontWeight="bold" color="blue.500">
            {helper.formatCurrencyVND(classDetail.price)} VND
          </TextView>

          <Divider />

          {/* Date and Time */}
          <HStack space={2} alignItems="center">
            <HStack alignItems="center" space={2}>
              <Icon as={Ionicons} name="calendar" size="md" color="green.500" />
              <TextView fontSize="md" color="gray.600">
                Date: {classDetail.date}
              </TextView>
            </HStack>
            <Divider w={2} />
            <HStack alignItems="center" space={2}>
              <TextView bold fontSize="md" color="gray.600">
                {helper.getDayOfWeek(classDetail.date)}
              </TextView>
            </HStack>
          </HStack>

          <HStack alignItems="center" space={2}>
            <Icon as={Ionicons} name="time" size="md" color="green.500" />
            <TextView fontSize="md" color="gray.600">
              Time: {classDetail.time}
            </TextView>
          </HStack>

          <Divider />

          <TextView fontSize="lg" fontWeight="bold" color="black">
            Description
          </TextView>
          <Text fontSize="md" color="gray.600">
            {classDetail.description}
          </Text>

          <Divider />

          {/* Benefits Section */}
          {classType?.benefits && classType.benefits.length > 0 && (
            <>
              <TextView fontSize="lg" fontWeight="bold" color="black">
                Benefits
              </TextView>
              <VStack space={2}>
                {classType.benefits.map((benefit, index) => (
                  <HStack key={index} alignItems="center" space={2}>
                    <Icon
                      as={Ionicons}
                      name="checkmark-circle"
                      size="sm"
                      color="green.500"
                    />
                    <TextView fontSize="md" color="gray.600">
                      {benefit}
                    </TextView>
                  </HStack>
                ))}
              </VStack>
              <Divider />
            </>
          )}

          <TextView fontSize="lg" fontWeight="bold" color="black">
            Instances
          </TextView>
          {classInstances.length === 0 ? (
            <TextView>Empty Instances of the class</TextView>
          ) : (
            classInstances.map((instance, index) => (
              <InstanceItem instance={instance} key={index} />
            ))
          )}
        </VStack>
      </ScrollView>
      {/* Footer Buttons */}
      <HStack
        bg={theme.colors.background}
        py={2}
        px={4}
        space={4}
        justifyContent="space-between"
        alignItems="center"
      >
        {isLoadingCheckBookedClass ? (
          <Center flex={1}>
            <Spinner size="lg" color={theme.colors.loading.color} />
          </Center>
        ) : isBookedClass ? (
          <AppButton
            title="View Booking Status"
            onPress={() => navigation.navigate("bookingStatus")}
            flex={1}
          />
        ) : (
          <HStack space={4} alignItems="center" justifyContent="center">
            <TouchableOpacity onPress={handleAskAddToCart}>
              <Box
                p={2}
                bg={theme.colors.blue[400]}
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderRadius={10}
              >
                <Icon as={Ionicons} name="cart" size="2xl" color="white" />
              </Box>
            </TouchableOpacity>
            <AppButton
              borderRadius={10}
              title="Book"
              onPress={handleBooking}
              flex={1}
            />
          </HStack>
        )}
      </HStack>
    </>
  );
};

export default YogaClassDetail;
