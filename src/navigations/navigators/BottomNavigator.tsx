import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import useBottomTabRoutes from "../hooks/useBottomTabRoutes";
import { BottomTabParams } from "../types/BottomTabParams.type";

const Tab = createBottomTabNavigator<BottomTabParams>();

const BottomTabNavigator = () => {
  const route = useBottomTabRoutes();

  return (
    <Tab.Navigator>
      {route.map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          options={route.options}
          component={route.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
