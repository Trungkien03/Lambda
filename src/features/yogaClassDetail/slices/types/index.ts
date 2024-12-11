import ClassType from "@app/stores/models/ClassType.model";
import Instance from "@app/stores/models/Instance.model";
import User from "@app/stores/models/User.model";

type yogaClassDetailState = {
  instances: {
    data: Instance[];
    isLoadingGetInstance: boolean;
  };
  lecture: {
    user: User | null;
    isLoadingGetLecture: boolean;
  };
  classType: {
    data: ClassType | null;
    isLoadingGetClassType: boolean;
  };
  isBookedClass: boolean;
  isLoadingCheckBookedClass: boolean;
};

const initialYogaClassDetailState: yogaClassDetailState = {
  instances: {
    data: [],
    isLoadingGetInstance: false,
  },
  lecture: {
    user: null,
    isLoadingGetLecture: false,
  },
  classType: {
    data: null,
    isLoadingGetClassType: false,
  },
  isBookedClass: false,
  isLoadingCheckBookedClass: false,
};

export { initialYogaClassDetailState };
export type { yogaClassDetailState };
