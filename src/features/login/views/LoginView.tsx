import AppButton from "@app/components/atoms/AppButton";
import LoadingIndicator from "@app/components/UI/LoadingIndicator";
import TextView from "@app/components/UI/TextView";
import { useAppSelector } from "@app/stores";
import { MaterialIcons } from "@expo/vector-icons";
import icons from "assets/icons";
import images from "assets/images";
import {
  Divider,
  HStack,
  Icon,
  Image,
  Input,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";
import useLoginViewModel from "../viewmodels/useLoginViewModel";
import SignInButton from "./components/SignInButton";

const LoginView = () => {
  const {
    handleChangeEmail,
    handleChangePassword,
    handlePressSignInGoogle,
    handlePressSignInForm,
  } = useLoginViewModel();
  const { isLoading } = useAppSelector((state) => state.loginView);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <VStack flex={1} justifyContent="center" alignItems="center">
        <VStack space={4} width="90%">
          <Image resizeMode="contain" width="100%" source={images.lambda} />

          {/* Trường Email */}
          <Input
            placeholder="Email Address"
            variant="outline"
            borderRadius={"2xl"}
            size="md"
            keyboardType="email-address"
            autoCapitalize="none"
            p={3}
            _focus={{ borderColor: "emerald.500" }}
            onChangeText={(text) => handleChangeEmail(text)}
          />

          <Input
            placeholder="Password"
            variant="outline"
            borderRadius={"2xl"}
            onChangeText={(text) => handleChangePassword(text)}
            size="md"
            type="password"
            p={3}
            _focus={{ borderColor: "emerald.500" }}
            InputRightElement={
              <Icon
                as={<MaterialIcons name="visibility-off" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            }
          />

          {/* Quên mật khẩu */}
          <TextView alignSelf="flex-end" color="emerald.600" fontSize="sm">
            Forgot Password?
          </TextView>

          <AppButton
            title="Login"
            onPress={handlePressSignInForm}
            borderRadius={"2xl"}
          />

          {/* OR Divider */}
          <HStack alignItems="center" space={2}>
            <Divider flex={1} />
            <Text fontSize="sm" color="gray.400">
              OR
            </Text>
            <Divider flex={1} />
          </HStack>

          <SignInButton
            title="Sign in with google"
            iconSource={icons.googleIcon}
            onPress={handlePressSignInGoogle}
            borderRadius={"2xl"}
          />
        </VStack>

        {/* Đăng ký tài khoản */}
        <HStack mt={4} alignItems="center" justifyContent="center">
          <TextView fontSize="sm" color="gray.500">
            Don’t have an account?{" "}
          </TextView>
          <TextView fontSize="sm" color="emerald.600" fontWeight="bold">
            Sign up
          </TextView>
        </HStack>

        <Spacer />
      </VStack>
    </>
  );
};

export default LoginView;
