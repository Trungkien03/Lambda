import BookingView from "./booking/views/BookingView";
import BookingStatusView from "./bookingstatus/views/BookingStatusView";
import CartView from "./carts/views/CartView";
import CategoryClassView from "./categoryclass/views/CategoryClassView";
import HomeView from "./home/views/HomeView";
import LoginView from "./login/views/LoginView";
import MyClassView from "./myclass/views/MyClassView";
import PaymentView from "./payment/views/PaymentView";
import PaymentSuccessView from "./paymentsuccess/views/PaymentSuccessView";
import ProfileView from "./profile/views/ProfileView";
import SearchView from "./search/views/SearchView";
import SlashScreen from "./slash/views/SlashScreen";
import YogaClassDetail from "./yogaClassDetail/views/YogaClassDetail";

const MainScreens = {
  LoginView,
  YogaClassDetail,
  SlashScreen,
  BookingView,
  BookingStatusView,
  CategoryClassView,
  PaymentView,
  PaymentSuccessView,
};

const BottomTabScreens = {
  HomeView,
  SearchView,
  ProfileView,
  MyClassView,
  CartView,
};

export { BottomTabScreens, MainScreens };
