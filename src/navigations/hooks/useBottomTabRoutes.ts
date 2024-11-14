import { BottomTabScreens } from "@app/features";
import { BottomTabRoute } from "../types/Route.type";

const useBottomTabRoutes = (): BottomTabRoute[] => {
  const routes: BottomTabRoute[] = [
    {
      name: "home",
      component: BottomTabScreens.HomeView,
      options: {
        headerShown: false,
      },
    },
    {
      name: "search",
      component: BottomTabScreens.SearchView,
      options: {
        headerShown: false,
      },
    },
    {
      name: "booking",
      component: BottomTabScreens.BookingView,
      options: {
        headerShown: false,
      },
    },
    {
      name: "profile",
      component: BottomTabScreens.ProfileView,
      options: {
        headerShown: false,
      },
    },
  ];

  return routes;
};

export default useBottomTabRoutes;
