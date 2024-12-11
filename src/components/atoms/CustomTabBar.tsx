// CustomTabBar.tsx
import { BottomTabParams } from "@app/navigations/types/BottomTabParams.type";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        let iconName: keyof typeof Ionicons.glyphMap;
        let label: string = "";
        switch (route.name as keyof BottomTabParams) {
          case "home":
            iconName = isFocused ? "home" : "home-outline";
            label = "Home";
            break;
          case "search":
            iconName = isFocused ? "search" : "search-outline";
            label = "Search";
            break;
          case "myClass":
            iconName = isFocused ? "calendar" : "calendar-outline";
            label = "My Class";
            break;
          case "cart":
            iconName = isFocused ? "cart" : "cart-outline";
            label = "Cart";
            break;
          case "profile":
            iconName = isFocused ? "person" : "person-outline";
            label = "Profile";
            break;
          default:
            iconName = "ellipse-outline";
        }

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tab}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#68D391" : "gray"} // Màu xanh lá khi focus, màu xám khi không focus
            />
            <Text
              style={{ color: isFocused ? "#68D391" : "gray", fontSize: 12 }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
});

export default CustomTabBar;
