import { Button, IButtonProps, Image, Text } from "native-base";
import React from "react";

interface SignInButtonProps extends IButtonProps {
  title?: string;
  onPress: () => void;
  iconSource: any;
}

const SignInButton: React.FC<SignInButtonProps> = ({
  title = "Sign in with Google",
  onPress,
  iconSource,
  ...props
}) => {
  return (
    <Button
      variant="outline"
      borderColor="gray.300"
      onPress={onPress}
      leftIcon={<Image source={iconSource} alt="Google Icon" size={5} mr={2} />}
      {...props}
    >
      <Text p={1} fontSize="md" color="gray.500">
        {title}
      </Text>
    </Button>
  );
};

export default SignInButton;
