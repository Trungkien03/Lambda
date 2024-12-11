import { ThemeType } from "@app/themes";
import { Box, useTheme } from "native-base";
import React from "react";

const OverlayLayer = () => {
  const theme = useTheme() as ThemeType;

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={theme.colors.black}
      opacity={0.8}
      zIndex={1}
    />
  );
};

export default OverlayLayer;
