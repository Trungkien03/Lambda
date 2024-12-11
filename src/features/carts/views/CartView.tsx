import AppButton from "@app/components/atoms/AppButton";
import YogaClassCard from "@app/components/atoms/card/YogaClassCard";
import LoadingIndicator from "@app/components/UI/LoadingIndicator";
import TextView from "@app/components/UI/TextView";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppSelector } from "@app/stores";
import { ThemeType } from "@app/themes";
import { Checkbox, HStack, Pressable, useTheme, VStack } from "native-base";
import React, { useLayoutEffect } from "react";
import { Platform, RefreshControl, UIManager } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import useCartViewModel from "../viewmodels/useCartViewModel";
import DeleteSwipeButton from "./components/DeleteSwipeButton";
import HeaderRightButton from "./components/HeaderRightButton";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CartView = () => {
  const theme = useTheme() as ThemeType;
  const { navigation } = useAppNavigation();
  const {
    classList,
    isLoadingDeleteClass,
    isLoadingGetClass,
    isSelecting,
    selectedItems,
  } = useAppSelector((state) => state.cartView);
  const {
    handleAskRemoveItem,
    fetchCartItems,
    handleBookNow,
    handleSelectItem,
  } = useCartViewModel();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Cart",
      headerTitleAlign: "center",
      headerRight: () => <HeaderRightButton />,
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
    });
  }, [isSelecting, navigation]);

  return (
    <>
      {isLoadingDeleteClass && <LoadingIndicator />}
      <VStack flex={1} bg={theme.colors.background} px={4}>
        <SwipeListView
          refreshControl={
            <RefreshControl
              refreshing={isLoadingGetClass}
              onRefresh={fetchCartItems}
            />
          }
          data={classList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                if (isSelecting) {
                  handleSelectItem(item.id);
                } else {
                  navigation.navigate("yogaClassDetail", { class: item });
                }
              }}
            >
              <HStack alignItems="center" space={4}>
                {isSelecting && (
                  <Checkbox
                    isChecked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    value={item.id}
                  />
                )}
                <YogaClassCard
                  imageUri={item.image_url}
                  title={item.title}
                  capacity={item.capacity}
                  price={item.price}
                  description={item.description}
                  time={item.time}
                  date={item.date}
                />
              </HStack>
            </Pressable>
          )}
          renderHiddenItem={({ item }) => (
            <DeleteSwipeButton
              handleAskRemoveItem={() => handleAskRemoveItem(item.id)}
            />
          )}
          ListEmptyComponent={
            <TextView fontSize="lg" color="gray.500" textAlign="center">
              Your cart is empty.
            </TextView>
          }
          rightOpenValue={-75}
          disableRightSwipe
        />
        {isSelecting && selectedItems.length > 0 && (
          <AppButton
            title="Book Now"
            onPress={handleBookNow}
            borderRadius={10}
          />
        )}
      </VStack>
    </>
  );
};

export default CartView;
