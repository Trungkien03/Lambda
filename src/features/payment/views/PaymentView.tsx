import AppButton from "@app/components/atoms/AppButton";
import BackButton from "@app/components/atoms/BackButton";
import LoadingIndicator from "@app/components/UI/LoadingIndicator";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppDispatch, useAppSelector } from "@app/stores";
import { ThemeType } from "@app/themes";
import helper from "@app/utils/helper";
import { Ionicons } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Spacer,
  Text,
  VStack,
  useTheme,
} from "native-base";
import React, { useLayoutEffect } from "react";
import { setIsOpenDialog } from "../slices";
import usePaymentViewModel from "../viewmodels/usePaymentViewModel";
import PaymentCheckoutItem from "./components/PaymentCheckoutItem";
import TipBox from "./components/TipBox";

const PaymentView = () => {
  const { navigation } = useAppNavigation();
  const theme = useTheme() as ThemeType;
  const { isDialogOpen, isLoadingAddTransaction } = useAppSelector(
    (state) => state.paymentView,
  );
  const { bankPaymentData, handleCopy, handleConfirmCheckout, bookings } =
    usePaymentViewModel();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Payment",
      headerTitleAlign: "center",
      headerLeft: () => <BackButton />,
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
    });
  }, []);

  return (
    <>
      {isLoadingAddTransaction && <LoadingIndicator />}
      <VStack flex={1} bg={theme.colors.background} p={4}>
        <ScrollView>
          <TipBox />

          {/* Booking Items Section */}
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="gray.600"
            marginBottom={4}
          >
            BOOKING ITEMS
          </Text>
          <VStack space={4} marginBottom={6}>
            {bookings.map((booking, index) => (
              <PaymentCheckoutItem booking={booking} key={index} />
            ))}
          </VStack>
        </ScrollView>

        {/* Grand Total */}
        <Divider my={2} />
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2}>
            ORDER SUMMARY
          </Text>

          <HStack alignItems="center" marginBottom={4}>
            <Text fontSize="md" fontWeight="bold" color="gray.800">
              Grand Total
            </Text>
            <Spacer />
            <Text fontSize="md" fontWeight="bold" color="green.500">
              {`${helper.formatCurrencyVND(
                bookings.reduce(
                  (total, booking) => total + booking.total_amount,
                  0,
                ),
              )} VND`}
            </Text>
          </HStack>
        </Box>

        {/* Payment Button */}
        <AppButton
          borderRadius={10}
          title="Make Payment"
          onPress={() => dispatch(setIsOpenDialog(true))}
        />

        {/* Bank Details Dialog */}
        <Actionsheet
          isOpen={isDialogOpen}
          onClose={() => dispatch(setIsOpenDialog(false))}
        >
          <Actionsheet.Content>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Bank Details
            </Text>
            <VStack space={4} w="100%" px={4}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize="sm" color="gray.800" bold>
                  Bank Name
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {bankPaymentData.bankDetails.bankName}
                </Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize="sm" color="gray.800" bold>
                  Account Name
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {bankPaymentData.bankDetails.accountName}
                </Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize="sm" color="gray.800" bold>
                  Account Number
                </Text>
                <HStack space={2} alignItems="center">
                  <Text fontSize="sm" fontWeight="bold" color="blue.600">
                    {bankPaymentData.bankDetails.accountNumber}
                  </Text>
                  <IconButton
                    icon={<Icon as={Ionicons} name="copy-outline" />}
                    size="sm"
                    colorScheme="blue"
                    onPress={() =>
                      handleCopy(bankPaymentData.bankDetails.accountNumber)
                    }
                  />
                </HStack>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize="sm" color="gray.800" bold>
                  Transfer Message
                </Text>
                <HStack space={2} alignItems="center">
                  <Text fontSize="sm" fontWeight="bold" color="blue.600">
                    {bankPaymentData.transferMessage}
                  </Text>
                  <IconButton
                    icon={<Icon as={Ionicons} name="copy-outline" />}
                    size="sm"
                    colorScheme="blue"
                    onPress={() => handleCopy(bankPaymentData.transferMessage)}
                  />
                </HStack>
              </HStack>

              <HStack alignItems="center" marginBottom={4}>
                <Text fontSize="sm" color="gray.800" bold>
                  Grand Total
                </Text>
                <Spacer />
                <Text fontSize="md" fontWeight="bold" color="green.500">
                  {`${helper.formatCurrencyVND(
                    bookings.reduce(
                      (total, booking) => total + booking.total_amount,
                      0,
                    ),
                  )} VND`}
                </Text>
              </HStack>
            </VStack>

            <HStack justifyContent={"space-between"} space={10}>
              <AppButton
                flex={1}
                borderRadius={10}
                title="Cancel"
                onPress={() => {
                  dispatch(setIsOpenDialog(false));
                }}
              />
              <AppButton
                flex={1}
                borderRadius={10}
                title="Confirm Done"
                onPress={handleConfirmCheckout}
              />
            </HStack>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
    </>
  );
};

export default PaymentView;
