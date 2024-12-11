import { ThemeType } from "@app/themes";
import { Center, Spinner, useTheme } from "native-base";
import React, { useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const LoadingIndicator = () => {
  const theme = useTheme() as ThemeType;
  const opacity = useRef(new Animated.Value(0)).current;

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Center>
        <Spinner size="lg" color={theme.colors.loading.color} />
      </Center>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(0, 128, 0, 0.7)",
  },
});

export default LoadingIndicator;
