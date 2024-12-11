import TextView from "@app/components/UI/TextView";
import { ThemeType } from "@app/themes";
import { Ionicons } from "@expo/vector-icons";
import { Divider, HStack, Icon, useTheme } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import MenuItem from "../../models/Menu.model";

const MenuItemView = ({ item }: { item: MenuItem }) => {
  const theme = useTheme() as ThemeType;
  return (
    <TouchableOpacity key={item.label} onPress={item.action}>
      <HStack alignItems="center" justifyContent="space-between" paddingY={4}>
        <HStack space={4} alignItems="center">
          <Icon
            as={Ionicons}
            name={item.icon}
            size="lg"
            color={theme.colors.green[500]}
          />
          <TextView fontSize="md" fontWeight="medium" color="gray.800">
            {item.label}
          </TextView>
        </HStack>
        <HStack alignItems="center" space={2}>
          <Icon
            as={Ionicons}
            name="chevron-forward"
            size="sm"
            color="gray.500"
          />
        </HStack>
      </HStack>
      <Divider />
    </TouchableOpacity>
  );
};

export default MenuItemView;
