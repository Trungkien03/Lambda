import YogaClassCard from "@app/components/atoms/card/YogaClassCard";
import { useAppSelector } from "@app/stores";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Icon,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";

const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { classes } = useAppSelector((state) => state.homeView);
  const [filteredClasses, setFilteredClasses] = useState(mockClassesData); // Dữ liệu giả cho danh sách lớp học
  const [totalResults, setTotalResults] = useState(325); // Giả định có 325 kết quả

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Thêm logic tìm kiếm và cập nhật danh sách filteredClasses dựa trên query
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredClasses(mockClassesData); // Reset dữ liệu về mặc định
  };

  return (
    <VStack flex={1} bg="white" padding={4}>
      <HStack space={2} alignItems="center">
        <Box flex={1}>
          <Input
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearch}
            variant="outline"
            bg="gray.100"
            borderRadius="2xl"
            py={2}
            px={4}
            InputLeftElement={
              <Icon
                as={Ionicons}
                name="search"
                size="sm"
                color="gray.500"
                ml={2}
              />
            }
          />
        </Box>
        <Pressable>
          <Icon as={Ionicons} name="filter" size="lg" color="emerald.500" />
        </Pressable>
      </HStack>

      {/* Kết quả tìm kiếm */}
      <Box my={4} bg="emerald.50" borderRadius="md" p={2}>
        <Text color="gray.600">
          Showing{" "}
          <Text color="emerald.500" fontWeight="bold">
            {totalResults} classes
          </Text>{" "}
          about{" "}
          <Text color="emerald.500" fontWeight="bold">
            {searchQuery || "Design"}
          </Text>
        </Text>
      </Box>

      {/* Tiêu đề danh sách lớp học */}
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Design Classes
      </Text>

      {/* Danh sách lớp học */}
      <FlatList
        style={{ flex: 1 }}
        data={filteredClasses}
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
        ItemSeparatorComponent={() => <Divider my={2} />}
      />
    </VStack>
  );
};

export default SearchView;

// Dữ liệu giả cho các lớp học
const mockClassesData = [
  {
    id: "1",
    imageUrl: "",
    title: "Handmade Textures & Halftones for Designers",
    capacity: 20,
    price: 50,
    description: "Dans Suriel",
    time: "1h 12m",
    date: "2024-12-01",
  },
  {
    id: "2",
    imageUrl: "",
    title: "Design a poster with an Abstract iridescent effect",
    capacity: 15,
    price: 45,
    description: "Maulana Mitre",
    time: "1h 12m",
    date: "2024-11-15",
  },
  {
    id: "3",
    imageUrl: "",
    title: "Realistic Design with Color and Expression",
    capacity: 25,
    price: 60,
    description: "Naima Lauren",
    time: "1h 12m",
    date: "2024-11-22",
  },
  // Thêm các lớp khác ở đây...
];
