import useSize from "@app/hooks/useSize";
import { ThemeType } from "@app/themes";
import { IButtonProps, Button as NBButton, Text, useTheme } from "native-base";
import React from "react";

interface CommonButtonProps extends IButtonProps {
  title: string;
  onPress: () => void;
}

const AppButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  ...props
}) => {
  const theme = useTheme() as ThemeType;
  const { fontSize } = useSize();

  return (
    <NBButton
      onPress={onPress}
      background={theme.colors.mainColor.button}
      {...props}
      _pressed={{
        opacity: 0.6, // Giảm độ mờ khi nhấn
      }}
    >
      <Text p={1} color="white" fontSize={fontSize} fontWeight="bold">
        {title}
      </Text>
    </NBButton>
  );
};

export default AppButton;
