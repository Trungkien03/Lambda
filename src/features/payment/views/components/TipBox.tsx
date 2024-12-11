import { MaterialIcons } from "@expo/vector-icons";
import { Box, Divider, HStack, Icon, Text, VStack } from "native-base";

const TipBox = () => {
  return (
    <Box
      bg="yellow.50"
      borderRadius="md"
      borderWidth={1}
      borderColor="yellow.200"
      padding={4}
      marginY={4}
    >
      <Text fontWeight="bold" color="yellow.800" mb={2}>
        Important Payment Instructions
      </Text>
      <VStack space={2}>
        <HStack alignItems="center" space={2}>
          <Icon
            as={MaterialIcons}
            name="error-outline"
            color="yellow.600"
            size="sm"
          />
          <Text color="gray.700" flex={1}>
            Payment must be made via bank transfer.
          </Text>
        </HStack>
        <Divider my={1} />
        <HStack alignItems="center" space={2}>
          <Icon
            as={MaterialIcons}
            name="error-outline"
            color="yellow.600"
            size="sm"
          />
          <Text color="gray.700" flex={1}>
            Enter the payment message exactly as described below.
          </Text>
        </HStack>
        <Divider my={1} />
        <HStack alignItems="center" space={2}>
          <Icon
            as={MaterialIcons}
            name="error-outline"
            color="yellow.600"
            size="sm"
          />
          <Text color="gray.700" flex={1}>
            Incorrect payment details may result in payment failure. Ensure
            accuracy before proceeding.
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TipBox;
