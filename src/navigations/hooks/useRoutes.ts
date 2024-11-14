import { MainScreens } from "@app/features";
import BottomTabNavigator from "../navigators/BottomNavigator";
import { Route } from "../types/Route.type";

const useRoutes = (): Route[] => {
  const routes: Route[] = [
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
      options: {
        headerShown: false,
      },
    },
  ];

  return routes;
};

export default useRoutes;
