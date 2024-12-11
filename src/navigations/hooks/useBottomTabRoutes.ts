import { BottomTabScreens } from "@app/features";
import { BottomTabRoute } from "../types/Route.type";

const useBottomTabRoutes = (): BottomTabRoute[] => {
  const routes: BottomTabRoute[] = [
    {
      name: "home",
      component: BottomTabScreens.HomeView,
    },
    {
      name: "search",
      component: BottomTabScreens.SearchView,
      options: {
        headerShown: false,
      },
    },
    {
      name: "myClass",
      component: BottomTabScreens.MyClassView,
    },
    { name: "cart", component: BottomTabScreens.CartView },
    {
      name: "profile",
      component: BottomTabScreens.ProfileView,
    },
  ];

  return routes;
};

export default useBottomTabRoutes;
