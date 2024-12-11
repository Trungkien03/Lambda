import ClassType from "@app/stores/models/ClassType.model";
import { FlatList, HStack, Image, Pressable, Text } from "native-base";
import React from "react";

interface ClassTypeGridProps {
  classTypes: ClassType[];
}

const ClassTypeGrid: React.FC<ClassTypeGridProps> = ({ classTypes }) => {
  return (
    <FlatList
      data={classTypes}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => (
        <Pressable onPress={() => console.log(`Selected ${item.name}`)}>
          <HStack
            alignItems="center"
            space={3}
            bg="white"
            borderRadius="md"
            borderWidth={1}
            borderColor="emerald.500"
            padding={3}
            margin={2}
            width="45%" // To fit two items per row with some spacing
          >
            <Image source={{ uri: item.image }} />
            <Text fontWeight="bold" color="black">
              {item.name}
            </Text>
          </HStack>
        </Pressable>
      )}
    />
  );
};

export default ClassTypeGrid;
