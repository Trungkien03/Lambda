import { MainScreens } from "@app/features";
import BottomTabNavigator from "../navigators/BottomNavigator";
import { Route } from "../types/Route.type";

const useRoutes = (): Route[] => {
  const routes: Route[] = [
    {
      name: "slash",
      component: MainScreens.SlashScreen,
      options: {
        headerShown: false,
      },
    },

    {
      name: "login",
      component: MainScreens.LoginView,
      options: {
        headerShown: false,
      },
    },
    {
      name: "main",
      component: BottomTabNavigator,
      options: {
        headerShown: false,
      },
    },
    {
      name: "yogaClassDetail",
      component: MainScreens.YogaClassDetail,
    },
    {
      name: "booking",
      component: MainScreens.BookingView,
    },
    {
      name: "bookingStatus",
      component: MainScreens.BookingStatusView,
    },
    {
      name: "categoryClass",
      component: MainScreens.CategoryClassView,
    },
    {
      name: "payment",
      component: MainScreens.PaymentView,
    },
    {
      name: "paymentSuccess",
      component: MainScreens.PaymentSuccessView,
      options: {
        headerShown: false,
      },
    },
  ];

  return routes;
};

export default useRoutes;
