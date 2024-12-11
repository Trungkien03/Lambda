import Class from "@app/stores/models/Class.model";

type cartViewState = {
  classList: Class[];
  isLoadingGetClass: boolean;
  isLoadingDeleteClass: boolean;
  isSelecting: boolean;
  selectedItems: string[];
};

const initialCartViewState: cartViewState = {
  classList: [],
  isLoadingGetClass: false,
  isLoadingDeleteClass: false,
  isSelecting: false,
  selectedItems: [],
};

export { initialCartViewState };
export type { cartViewState };
