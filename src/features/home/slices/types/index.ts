import Class from "@app/stores/models/Class.model";
import ClassType from "@app/stores/models/ClassType.model";

type HomeViewState = {
  classes: Class[];
  classTypes: ClassType[];
  isLoadingGetClass: boolean;
};

const initialHomeViewState: HomeViewState = {
  classes: [],
  classTypes: [],
  isLoadingGetClass: false,
};

export { initialHomeViewState };
export type { HomeViewState };
