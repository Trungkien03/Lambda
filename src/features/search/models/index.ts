type OnApplyFunction = (filters: FilterSearchType) => void;

type FilterSearchType = {
  startDate: Date | null;
  endDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
};

type PickerType = "startDate" | "endDate" | "startTime" | "endTime" | "";

type PickerState = {
  type: PickerType;
  visible: boolean;
};

export type { FilterSearchType, OnApplyFunction, PickerState, PickerType };
