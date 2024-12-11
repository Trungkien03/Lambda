import AppButton from "@app/components/atoms/AppButton";
import TextView from "@app/components/UI/TextView";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppSelector } from "@app/stores";
import { ThemeType } from "@app/themes";
import { Avatar, Box, HStack, Spacer, useTheme, VStack } from "native-base";
import React, { useLayoutEffect } from "react";
import useProfileViewModel from "../viewmodels/useProfileViewModel";
import MenuItemView from "./components/MenuItemView";

const ProfileView = () => {
  const { navigation } = useAppNavigation();
  const { user } = useAppSelector((state) => state.auth);
  const theme = useTheme() as ThemeType;

  const { menuItems, handleSignOut } = useProfileViewModel();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
    });
  }, []);

  return (
    <VStack flex={1} bg={theme.colors.background} padding={4}>
      {/* Profile Header */}
      <HStack space={4} alignItems="center" paddingY={4}>
        <Avatar
          source={{
            uri: user?.profile_image,
          }}
          size="lg"
        />
        <VStack flex={1}>
          <TextView fontSize="lg" fontWeight="bold" color="gray.800">
            {user?.name}
          </TextView>
          <TextView fontSize="sm" color="gray.500">
            Logged in
          </TextView>
        </VStack>
      </HStack>

      {/* Menu Items */}
      <Box marginTop={4}>
        {menuItems.map((item, index) => (
          <MenuItemView item={item} key={index} />
        ))}
      </Box>

      <Spacer />
      <AppButton borderRadius={10} title="Sign out" onPress={handleSignOut} />
    </VStack>
  );
};

export default ProfileView;
