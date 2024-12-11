import AppButton from "@app/components/atoms/AppButton";
import TextView from "@app/components/UI/TextView";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Box, Button, Divider, HStack, Text, VStack } from "native-base";
import React from "react";
import { OnApplyFunction } from "../../models";
import useFilterSheetViewModel from "../../viewmodels/useFilterSheetViewModel";

interface FilterSheetViewProps {
  onApply: OnApplyFunction;
}
const FilterSheetView: React.FC<FilterSheetViewProps> = ({ onApply }) => {
  const {
    endDate,
    endTime,
    error,
    handlePickerChange,
    setShowPicker,
    showPicker,
    startDate,
    startTime,
    clearAll,
    validateAndApply,
  } = useFilterSheetViewModel();

  return (
    <VStack space={4} padding={4} bg="white">
      <TextView fontSize="lg" fontWeight="bold" mb={2}>
        Filter Classes
      </TextView>

      {/* Error Message */}
      {error && (
        <Text color="red.500" mb={2}>
          {error}
        </Text>
      )}

      {/* Date Range Filter */}
      <Box mb={4}>
        <TextView mb={2}>Date Range:</TextView>
        <HStack alignItems="center" justifyContent="space-between" space={4}>
          <Button
            onPress={() => setShowPicker({ type: "startDate", visible: true })}
            variant="subtle"
            flex={1}
          >
            {startDate ? startDate.toLocaleDateString() : "Start Date"}
          </Button>
          <Divider orientation="horizontal" w={5} />
          <Button
            onPress={() => setShowPicker({ type: "endDate", visible: true })}
            variant="subtle"
            flex={1}
          >
            {endDate ? endDate.toLocaleDateString() : "End Date"}
          </Button>
        </HStack>
      </Box>

      {/* Time Range Filter */}
      <Box mb={4}>
        <TextView mb={2}>Time Range:</TextView>
        <HStack alignItems="center" justifyContent="space-between" space={4}>
          <Button
            onPress={() => setShowPicker({ type: "startTime", visible: true })}
            variant="subtle"
            flex={1}
          >
            {startTime
              ? startTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Start Time"}
          </Button>
          <Divider orientation="horizontal" w={5} />
          <Button
            onPress={() => setShowPicker({ type: "endTime", visible: true })}
            variant="subtle"
            flex={1}
          >
            {endTime
              ? endTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "End Time"}
          </Button>
        </HStack>
      </Box>

      <AppButton
        borderRadius={10}
        title="Apply Filter"
        onPress={() => validateAndApply(onApply)}
      />
      <Button
        borderRadius={10}
        onPress={clearAll}
        colorScheme="red"
        variant="outline"
      >
        Clear All
      </Button>
      {/* DateTimePicker */}
      {showPicker.visible && (
        <DateTimePicker
          value={
            showPicker.type === "startDate" || showPicker.type === "endDate"
              ? (showPicker.type === "startDate" ? startDate : endDate) ||
                new Date()
              : (showPicker.type === "startTime" ? startTime : endTime) ||
                new Date()
          }
          mode={
            showPicker.type === "startDate" || showPicker.type === "endDate"
              ? "date"
              : "time"
          }
          display={
            showPicker.type === "startDate" || showPicker.type === "endDate"
              ? "calendar"
              : "clock"
          }
          onChange={(event, selectedValue) => {
            if (event.type === "set" && selectedValue) {
              handlePickerChange(event, selectedValue);
            } else {
              setShowPicker({ type: "", visible: false });
            }
          }}
        />
      )}
    </VStack>
  );
};

export default FilterSheetView;
