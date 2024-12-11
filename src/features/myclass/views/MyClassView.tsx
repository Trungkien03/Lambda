import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppSelector } from "@app/stores";
import { ThemeType } from "@app/themes";
import { Box, FlatList, Spacer, Text, useTheme, VStack } from "native-base";
import React, { useLayoutEffect } from "react";
import { RefreshControl } from "react-native";
import useMyClassViewModel from "../viewmodels/useMyClassViewModel";
import MyClassViewItem from "./components/MyClassViewItem";

const MyClassView = () => {
  const { navigation } = useAppNavigation();
  const theme = useTheme() as ThemeType;

  const { bookings = [], isLoadingGetBooking } = useAppSelector(
    (state) => state.myClassView || {}, // Handle undefined myClassView
  );

  const { handleFetchingGetBooking } = useMyClassViewModel();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Class",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
    });
  }, []);

  const paidBookings = bookings.filter(
    (booking) => booking.payment_status === "Paid",
  );

  return (
    <VStack flex={1} bg={theme.colors.background} padding={4}>
      <FlatList
        data={paidBookings}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingGetBooking}
            onRefresh={handleFetchingGetBooking}
          />
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MyClassViewItem booking={item} />}
        ItemSeparatorComponent={() => <Spacer />}
        ListEmptyComponent={
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text fontSize="md" color="gray.500">
              No paid classes found.
            </Text>
          </Box>
        }
      />
    </VStack>
  );
};

export default MyClassView;
