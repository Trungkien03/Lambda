import images from "assets/images";
import { Image, VStack } from "native-base";
import React from "react";

const SlashScreen = () => {
  return (
    <VStack flex={1}>
      <Image source={images.slash} flex={1} />
    </VStack>
  );
};

export default SlashScreen;
