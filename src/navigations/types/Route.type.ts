import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { BottomTabParams } from "./BottomTabParams.type";
import { RootStackParams } from "./RootStackParams.type";

type Route = {
  name: keyof RootStackParams;
  component: React.ComponentType<{}>;
  options?: StackNavigationOptions;
};

type BottomTabRoute = {
  name: keyof BottomTabParams;
  component: React.ComponentType<{}>;
  options?: BottomTabNavigationOptions;
};

// type DrawerRoute<ParamList> = {
//   name: keyof ParamList;
//   component: React.ComponentType<any>;
//   options?: DrawerNavigationOptions;
// };

// type BottomTabRoute<ParamList> = {
//   name: keyof ParamList;
//   component: React.ComponentType<any>;
//   options?: BottomTabNavigationOptions;
// };

export type { BottomTabRoute, Route };
