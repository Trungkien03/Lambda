import { createSlice } from "@reduxjs/toolkit";
import { initialYogaClassDetailState } from "./types";

const yogaClassDetailSlice = createSlice({
  name: "yogaClassDetail",
  initialState: initialYogaClassDetailState,
  reducers: {
    setInstances: (state, action) => {
      state.instances.data = action.payload;
    },
    setInstancesIsLoading: (state, action) => {
      state.instances.isLoadingGetInstance = action.payload;
    },
    setLecture: (state, action) => {
      state.lecture.user = action.payload;
    },
    setLectureIsLoading: (state, action) => {
      state.lecture.isLoadingGetLecture = action.payload;
    },
    setClassType: (state, action) => {
      state.classType.data = action.payload;
    },
    setClassTypeIsLoading: (state, action) => {
      state.classType.isLoadingGetClassType = action.payload;
    },
    setIsBookedClass: (state, action) => {
      state.isBookedClass = action.payload;
    },
    setIsLoadingCheckBookedClass: (state, action) => {
      state.isLoadingCheckBookedClass = action.payload;
    },
    resetYogaClassDetailState: () => {
      return initialYogaClassDetailState;
    },
  },
});

export const {
  setInstances,
  setInstancesIsLoading,
  setLecture,
  setLectureIsLoading,
  resetYogaClassDetailState,
  setClassType,
  setClassTypeIsLoading,
  setIsBookedClass,
  setIsLoadingCheckBookedClass,
} = yogaClassDetailSlice.actions;
export default yogaClassDetailSlice.reducer;
