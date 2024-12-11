import BackButton from "@app/components/atoms/BackButton";
import TabContent from "@app/components/layouts/TabContent";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { ThemeType } from "@app/themes";
import { useTheme, VStack } from "native-base";
import React, { useLayoutEffect, useState } from "react";
import CancelledBookingStatusView from "./partials/CancelledBookingStatusView";
import PaidBookingStatusView from "./partials/PaidBookingStatusView";
import RefundBookingStatus from "./partials/RefundBookingStatus";
import UnpaidBookingStatusView from "./partials/UnpaidBookingStatusView";
import useBookingStatusViewModel from "../viewmodels/useBookingStatusViewModel";

const BookingStatusView = () => {
  const { navigation } = useAppNavigation();
  const theme = useTheme() as ThemeType;
  const [activeTab, setActiveTab] = useState("unpaid");
  useBookingStatusViewModel();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Booking Status",
      headerTitleAlign: "center",
      headerLeft: () => <BackButton />,
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
    });
  }, []);

  const tabs = [
    {
      key: "unpaid",
      title: "Unpaid",
      content: <UnpaidBookingStatusView />,
    },
    {
      key: "paid",
      title: "Paid",
      content: <PaidBookingStatusView />,
    },
    {
      key: "refund",
      title: "Refund",
      content: <RefundBookingStatus />,
    },
    {
      key: "cancelled",
      title: "Cancelled",
      content: <CancelledBookingStatusView />,
    },
  ];

  return (
    <VStack flex={1} bg={theme.colors.background}>
      <TabContent
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </VStack>
  );
};

export default BookingStatusView;
