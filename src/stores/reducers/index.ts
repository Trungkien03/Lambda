import homeViewSlice from "@app/features/home/slices";
import loginViewSlice from "@app/features/login/slices";
import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../slices";

const reducer = {
  dialog: appReducer.dialogSlice,
  auth: appReducer.authSlice,
  loginView: loginViewSlice,
  homeView: homeViewSlice,
};

const rootReducer = combineReducers(reducer);
export default rootReducer;
