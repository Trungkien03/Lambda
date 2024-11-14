import YogaClassCard from "@app/components/atoms/card/YogaClassCard";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppSelector } from "@app/stores";
import { ThemeType } from "@app/themes";
import { FlatList, View, useTheme, Text, Divider } from "native-base";
import React, { useLayoutEffect } from "react";
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
    <View flex={1} bg={theme.colors.background} p={4}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <YogaClassCard
            imageUri={item.imageUrl}
            title={item.title}
            capacity={item.capacity}
            price={item.price}
            description={item.description}
            time={item.time}
            date={item.date}
          />
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
    </View>
  );
};

export default HomeView;
