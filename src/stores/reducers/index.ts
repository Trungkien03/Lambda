import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../slices";

const reducer = {
  dialog: appReducer.dialogSlice,
  auth: appReducer.authSlice,
};

const rootReducer = combineReducers(reducer);
export default rootReducer;
