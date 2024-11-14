// CustomTabBar.tsx
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
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        // Xác định iconName và màu sắc cho từng tab
        let iconName: keyof typeof Ionicons.glyphMap;
        switch (route.name) {
          case "home":
            iconName = isFocused ? "home" : "home-outline";
            break;
          case "search":
            iconName = isFocused ? "search" : "search-outline";
            break;
          case "booking":
            iconName = isFocused ? "calendar" : "calendar-outline";
            break;
          case "profile":
            iconName = isFocused ? "person" : "person-outline";
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
              {String(label)}
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
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
});

export default CustomTabBar;
