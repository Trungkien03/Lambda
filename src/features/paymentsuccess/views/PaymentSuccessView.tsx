import AppButton from "@app/components/atoms/AppButton";
import useAppNavigation from "@app/hooks/useAppNavigation";
import images from "assets/images";
import { Box, Center, Image, Text, VStack } from "native-base";
import React from "react";

const TipBox = ({ message }: { message: string }) => {
  return (
    <Box
      bg="yellow.50"
      borderRadius="md"
      borderWidth={1}
      borderColor="yellow.200"
      p={4}
      mt={4}
      w="100%"
    >
      <Text fontSize="sm" color="gray.600">
        {message}
      </Text>
    </Box>
  );
};

const PaymentSuccessView = () => {
  const { navigation } = useAppNavigation();

  return (
    <Center flex={1} bg="green.50" px={4}>
      <VStack space={2} alignItems="center" width="100%">
        {/* Success Image */}
        <Image
          source={images.payment_success}
          size={"2xl"}
          alt="Payment Success"
        />

        {/* Title */}
        <Text fontSize="2xl" fontWeight="bold" color="green.700">
          Thank You!
        </Text>

        <TipBox message="Our admin will verify your payment shortly. Once confirmed, we will update your status and contact you if needed." />
        <TipBox message="You will be redirected to the home page shortly or click below to return to the home page." />

        <AppButton
          title="Return to Home"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "main" }],
            })
          }
        />
      </VStack>
    </Center>
  );
};

export default PaymentSuccessView;
