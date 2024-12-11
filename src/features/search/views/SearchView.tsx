import YogaClassCard from "@app/components/atoms/card/YogaClassCard";
import OverlayLayer from "@app/components/layouts/OverlayLayer";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppSelector } from "@app/stores";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import useSearchViewModel from "../viewmodels/useSearchViewModel";
import FilterSheetView from "./components/FilterSheetView";

const SearchView = () => {
  const {
    searchResult: { data },
    searchQuery,
  } = useAppSelector((state) => state.searchView);

  const { navigation } = useAppNavigation();

  const {
    applyFilter,
    bottomSheetRef,
    handleSearch,
    openBottomSheet,
    isShowingBottomSheet,
    setIsShowingBottomSheet,
  } = useSearchViewModel();

  return (
    <>
      <VStack safeArea flex={1} bg="white" p={4}>
        {isShowingBottomSheet && <OverlayLayer />}
        <HStack space={2} alignItems="center">
          <Box flex={1}>
            <Input
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearch}
              variant="outline"
              bg="gray.100"
              size={"md"}
              borderRadius="2xl"
              py={2}
              px={4}
              InputLeftElement={
                <Icon
                  as={Ionicons}
                  name="search"
                  size="md"
                  color="gray.500"
                  ml={4}
                />
              }
            />
          </Box>
          <TouchableOpacity onPress={openBottomSheet}>
            <Icon as={Ionicons} name="filter" size="lg" color="emerald.500" />
          </TouchableOpacity>
        </HStack>

        <Box my={4} bg="emerald.50" borderRadius="md" p={2}>
          <Text color="gray.600">
            Showing{" "}
            <Text color="emerald.500" fontWeight="bold">
              {data.length} classes
            </Text>{" "}
            {searchQuery && searchQuery.trim() !== "" && (
              <>
                about{" "}
                <Text color="emerald.500" fontWeight="bold">
                  {searchQuery}
                </Text>
              </>
            )}
          </Text>
        </Box>

        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Results
        </Text>

        <FlatList
          style={{ flex: 1 }}
          data={data}
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
          ItemSeparatorComponent={() => <Divider my={2} />}
        />
      </VStack>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["50%"]}
        enablePanDownToClose={true}
        onClose={() => setIsShowingBottomSheet(false)}
      >
        <BottomSheetView>
          <FilterSheetView onApply={(filter) => applyFilter(filter)} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default SearchView;
