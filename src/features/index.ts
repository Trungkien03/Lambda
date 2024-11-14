import BookingView from "./booking/views/BookingView";
import HomeView from "./home/views/HomeView";
import LoginView from "./login/views/LoginView";
import ProfileView from "./profile/views/ProfileView";
import SearchView from "./search/views/SearchView";
import YogaClassDetail from "./yogaClassDetail/views/YogaClassDetail";

const MainScreens = {
  LoginView,
  YogaClassDetail,
};

const BottomTabScreens = {
  HomeView,
  SearchView,
  ProfileView,
  BookingView,
};

export { BottomTabScreens, MainScreens };
