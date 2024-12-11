import useAppNavigation from "@app/hooks/useAppNavigation";
import { ThemeType } from "@app/themes";
import { Ionicons } from "@expo/vector-icons";
import { Icon, IconButton, IIconButtonProps, useTheme } from "native-base";
import React, { useState } from "react";

const BackButton = ({ ...props }: IIconButtonProps) => {
  const { navigation } = useAppNavigation();
  const theme = useTheme() as ThemeType;

  const [isNavigating, setIsNavigating] = useState(false);

  const handleGoBack = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.goBack();

      setTimeout(() => {
        setIsNavigating(false);
      }, 500);
    }
  };

  return (
    <IconButton
      borderRadius="full"
      bg={theme.colors.mainColor.button}
      mx={5}
      onPress={handleGoBack}
      isDisabled={isNavigating}
      {...props}
      icon={<Icon as={Ionicons} name="arrow-back" size="sm" color={"white"} />}
    />
  );
};

export default BackButton;
