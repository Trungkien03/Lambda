import bookingViewSlice from "@app/features/booking/slices";
import bookingStatusSlice from "@app/features/bookingstatus/slices";
import cartViewSlice from "@app/features/carts/slices";
import homeViewSlice from "@app/features/home/slices";
import loginViewSlice from "@app/features/login/slices";
import myClassViewSlice from "@app/features/myclass/slices";
import paymentViewSlice from "@app/features/payment/slices";
import searchViewSlice from "@app/features/search/slices";
import yogaClassDetailSlice from "@app/features/yogaClassDetail/slices";
import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../slices";

const reducer = {
  dialog: appReducer.dialogSlice,
  auth: appReducer.authSlice,
  loginView: loginViewSlice,
  homeView: homeViewSlice,
  searchView: searchViewSlice,
  yogaClassDetailView: yogaClassDetailSlice,
  cartView: cartViewSlice,
  bookingView: bookingViewSlice,
  bookingStatusView: bookingStatusSlice,
  paymentView: paymentViewSlice,
  myClassView: myClassViewSlice,
};

const rootReducer = combineReducers(reducer);
export default rootReducer;
