import { useState } from "react";
import { OnApplyFunction, PickerState } from "../models";

const useFilterSheetViewModel = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState<PickerState>({
    type: "",
    visible: false,
  });

  const handlePickerChange = (event: any, selectedValue: Date | undefined) => {
    setShowPicker({ type: "", visible: false });
    if (selectedValue) {
      switch (showPicker.type) {
        case "startDate":
          setStartDate(selectedValue);
          break;
        case "endDate":
          setEndDate(selectedValue);
          break;
        case "startTime":
          setStartTime(selectedValue);
          break;
        case "endTime":
          setEndTime(selectedValue);
          break;
        default:
          break;
      }
    }
  };

  const validateAndApply = (applyOptions: OnApplyFunction) => {
    setError(null);

    if (startDate && endDate && startDate > endDate) {
      setError("End date must be after or the same as the start date.");
      return;
    }
    if (startTime && endTime && startTime > endTime) {
      setError("End time must be after or the same as the start time.");
      return;
    }

    applyOptions({ startDate, endDate, startTime, endTime });
  };

  // Clear all filters
  const clearAll = () => {
    setStartDate(null);
    setEndDate(null);
    setStartTime(null);
    setEndTime(null);
    setError(null);
  };

  return {
    startDate,
    endDate,
    startTime,
    endTime,
    error,
    validateAndApply,
    handlePickerChange,
    setShowPicker,
    showPicker,
    clearAll,
  };
};

export default useFilterSheetViewModel;
