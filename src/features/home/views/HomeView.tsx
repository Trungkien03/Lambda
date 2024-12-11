import YogaClassCard from "@app/components/atoms/card/YogaClassCard";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppSelector } from "@app/stores";
import { ThemeType } from "@app/themes";
import { Box, Divider, FlatList, Text, useTheme } from "native-base";
import React, { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import useHomeViewModel from "../viewmodels/useHomeViewModel";
import HeaderHomeView from "./components/HeaderHomeView";

const HomeView = () => {
  const { navigation } = useAppNavigation();
  useHomeViewModel();
  const theme = useTheme() as ThemeType;
  const { classes } = useAppSelector((state) => state.homeView);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderHomeView />,
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTitleAlign: "center",
    });
  }, [navigation, theme]);

  return (
    <Box safeArea flex={1} bg={theme.colors.background} px={4}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("yogaClassDetail", { class: item })
            }
          >
            <YogaClassCard
              imageUri={item.image_url}
              title={item.title}
              capacity={item.capacity}
              price={item.price}
              description={item.description}
              time={item.time}
              date={item.date}
            />
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <>
            <Divider />
            <Text fontSize="xl" fontWeight="bold">
              Yoga Classes
            </Text>
          </>
        }
      />
    </Box>
  );
};

export default HomeView;
